# -*- coding: utf-8 -*-
"""快乐8 (80选20) 近26期统计推演"""
import json
from collections import Counter

data = json.load(open('hp.js', encoding='utf-8'))
data.sort(key=lambda x: int(x['code']))
codes = [d['code'] for d in data]
draws = [[int(v) for v in d['red'].split(',')] for d in data]
n = len(draws)
all_nums = list(range(1, 81))

# 完整性校验
for c, d in zip(codes, draws):
    assert len(d) == 20 and len(set(d)) == 20 and all(1 <= x <= 80 for x in d), c

print(f"期数: {n}  范围: {codes[0]} ~ {codes[-1]}")
print(f"每期号码数: 20  理论均值频次: {n*20/80:.2f}\n")

freq_all = Counter()
for d in draws:
    freq_all.update(d)
freq5 = Counter()
freq10 = Counter()
for d in draws[-5:]:
    freq5.update(d)
for d in draws[-10:]:
    freq10.update(d)

# 当前遗漏
last_seen = {}
for i, d in enumerate(draws):
    for v in d:
        last_seen[v] = i
omission = {v: (n - 1 - last_seen[v]) if v in last_seen else n for v in all_nums}

# 历史平均间隔
def avg_gap(v):
    idxs = [i for i, d in enumerate(draws) if v in d]
    if len(idxs) < 2:
        return None
    return sum(b - a - 1 for a, b in zip(idxs, idxs[1:])) / (len(idxs) - 1)

print("=" * 100)
print("一、号码频次 / 遗漏总表 (按期号升序, 最新一期在最后)")
print("=" * 100)
print(f"{'号码':>4} {'总次数':>6} {'近10':>5} {'近5':>4} {'当前遗漏':>8} {'平均间隔':>8}")
for v in all_nums:
    ag = avg_gap(v)
    print(f"{v:>4} {freq_all[v]:>6} {freq10[v]:>5} {freq5[v]:>4} {omission[v]:>8} {('%.1f' % ag) if ag is not None else '--':>8}")

print("\n" + "=" * 100)
print("二、热号榜 (按近10期出现次数, 再按近5期)")
print("=" * 100)
hot = sorted(all_nums, key=lambda v: (-freq10[v], -freq5[v], -freq_all[v], v))[:15]
print("排名前15:", [(v, freq10[v], freq5[v], freq_all[v]) for v in hot])

print("\n" + "=" * 100)
print("三、冷号 / 高遗漏榜 (当前遗漏 >= 3)")
print("=" * 100)
cold = sorted([v for v in all_nums if omission[v] >= 3], key=lambda v: (-omission[v], freq_all[v]))
print("高遗漏号码 (号码, 遗漏, 总次数, 近10):")
for v in cold[:20]:
    print(f"  {v:02d}  遗漏{omission[v]:>2}期  总{freq_all[v]}次  近10={freq10[v]}")

print("\n" + "=" * 100)
print("四、每期结构统计")
print("=" * 100)
print(f"{'期号':>9} {'和值':>5} {'跨度':>4} {'奇':>3} {'大':>3} {'区1':>4} {'区2':>4} {'区3':>4} {'区4':>4} {'连号':>4} {'重号':>4}")
prev = None
sums, spans, odds, bigs = [], [], [], []
zone_tot = [0, 0, 0, 0]
cons_tot, rep_tot = 0, 0
for c, d in zip(codes, draws):
    s = sum(d)
    span = max(d) - min(d)
    odd = sum(1 for x in d if x % 2 == 1)
    big = sum(1 for x in d if x > 40)
    z = [sum(1 for x in d if lo <= x <= hi) for lo, hi in [(1, 20), (21, 40), (41, 60), (61, 80)]]
    zs = sorted(d)
    cons = sum(1 for a, b in zip(zs, zs[1:]) if b - a == 1)
    rep = len(set(d) & set(prev)) if prev else 0
    sums.append(s); spans.append(span); odds.append(odd); bigs.append(big)
    zone_tot = [a + b for a, b in zip(zone_tot, z)]
    cons_tot += cons; rep_tot += rep
    print(f"{c:>9} {s:>5} {span:>4} {odd:>3} {big:>3} {z[0]:>4} {z[1]:>4} {z[2]:>4} {z[3]:>4} {cons:>4} {rep:>4}")
    prev = d

print("-" * 100)
print(f"平均: 和值={sum(sums)/n:.1f}  跨度={sum(spans)/n:.1f}  奇数={sum(odds)/n:.1f}  大数={sum(bigs)/n:.1f}")
print(f"四区平均: {[round(t/n,1) for t in zone_tot]}  (理论各5.0)")
print(f"平均连号对数: {cons_tot/n:.2f}  平均重号(与上期): {rep_tot/(n-1):.2f} (理论5.0)")
print(f"和值区间: {min(sums)} ~ {max(sums)}")

# 最新一期
last = draws[-1]
print("\n" + "=" * 100)
print(f"五、最新一期 {codes[-1]} 号码")
print("=" * 100)
print(last)

# 综合评分: 近5权重最高
def score(v):
    return freq5[v] * 2.0 + freq10[v] * 1.0 + freq_all[v] * 0.25 - omission[v] * 0.15

ranked = sorted(all_nums, key=lambda v: -score(v))
print("\n综合加权评分前20:")
for v in ranked[:20]:
    print(f"  {v:02d}  score={score(v):.2f}  近5={freq5[v]} 近10={freq10[v]} 总={freq_all[v]} 遗漏={omission[v]}")
