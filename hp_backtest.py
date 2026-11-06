# -*- coding: utf-8 -*-
"""策略回测 + 推荐组合校验"""
import json
from collections import Counter

data = json.load(open('hp.js', encoding='utf-8'))
data.sort(key=lambda x: int(x['code']))
codes = [d['code'] for d in data]
draws = [[int(v) for v in d['red'].split(',')] for d in data]
n = len(draws)
all_nums = list(range(1, 81))

# ---- 1. 重号分布 ----
rep_counts = [len(set(draws[i]) & set(draws[i-1])) for i in range(1, n)]
print("重号(与上期重复个数)分布:", dict(sorted(Counter(rep_counts).items())))
print(f"平均重号: {sum(rep_counts)/len(rep_counts):.2f}  理论: 5.00")
print(f"重号取值范围: {min(rep_counts)} ~ {max(rep_counts)}")

# ---- 2. 和值分位 ----
sums = sorted(sum(d) for d in draws)
def q(p):
    return sums[int(p * (len(sums) - 1))]
print(f"\n和值: min={sums[0]} 25%={q(.25)} 50%={q(.5)} 75%={q(.75)} max={sums[-1]} 均值={sum(sums)/n:.1f}")
print(f"和值落在 720~900 的期数: {sum(1 for s in sums if 720 <= s <= 900)}/{n}")

# ---- 3. 回测: 热号 top10 (前10期频次) 命中率 ----
def hot_rate(window):
    hits = 0
    total = 0
    for t in range(max(window, 1), n):
        prior = draws[t-window:t]
        c = Counter()
        for d in prior:
            c.update(d)
        top = sorted(all_nums, key=lambda v: (-c[v], v))[:10]
        hit = len(set(top) & set(draws[t]))
        hits += hit
        total += 10
    return hits, total

for w in (5, 10):
    h, t = hot_rate(w)
    print(f"\n近{w}期热号Top10 -> 下一期命中率: {h}/{t} = {h/t*100:.1f}%  (基准25%)")

# ---- 4. 回测: 重号命中率 ----
hits = sum(len(set(draws[i]) & set(draws[i-1])) for i in range(1, n))
total = (n - 1) * 20
print(f"上期号码 -> 本期出现率: {hits}/{total} = {hits/total*100:.1f}%  (基准25%)")

# ---- 5. 回测: 冷号(遗漏>=k) 命中率 ----
for k in (5, 8, 12):
    hits = 0
    total = 0
    for t in range(1, n):
        last = {}
        for i in range(t):
            for v in draws[i]:
                last[v] = i
        cold = []
        for v in all_nums:
            om = (t - 1 - last[v]) if v in last else t
            if om >= k:
                cold.append(v)
        if not cold:
            continue
        hit = len(set(cold) & set(draws[t]))
        hits += hit
        total += len(cold)
    print(f"遗漏>={k}期冷号 -> 下一期命中率: {hits}/{total} = {hits/total*100:.1f}%  (基准25%)")

# ---- 6. 校验推荐组合结构 ----
def check(name, nums):
    nums = sorted(nums)
    z = [sum(1 for x in nums if lo <= x <= hi) for lo, hi in [(1,20),(21,40),(41,60),(61,80)]]
    odd = sum(1 for x in nums if x % 2)
    big = sum(1 for x in nums if x > 40)
    rep = len(set(nums) & set(draws[-1]))
    ds = nums
    cons = sum(1 for a, b in zip(ds, ds[1:]) if b - a == 1)
    print(f"\n【{name}】共{len(nums)}个")
    print("  号码:", ','.join(f'{x:02d}' for x in nums))
    print(f"  区间: {z}  奇偶: {odd}/{len(nums)-odd}  大小: {big}/{len(nums)-big}")
    print(f"  和值: {sum(nums)}  跨度: {max(nums)-min(nums)}  重号: {rep}  连号对: {cons}")

main20 = [3,5,9,16,19,25,27,30,38,40,45,47,52,56,58,66,68,73,75,78]
pick10 = [9,16,19,27,40,47,56,58,66,73]
pick9  = [16,19,27,40,47,56,58,66,73]
pick8  = [16,27,40,47,58,66,73,19]
dan3   = [16,40,58]
check("20码大底(均衡型)", main20)
check("精选10码(选十)", pick10)
check("精选9码(选九)", pick9)
check("精选8码(选八)", pick8)
check("三胆", dan3)
