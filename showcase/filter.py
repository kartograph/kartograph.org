import json
import sys

in_file = sys.argv[1]
out_file = sys.argv[2]
cities = json.loads(open(in_file).read())
out = []

keep = ('city_name', 'nb_visits', 'long', 'lat')

for c in cities:
    o = dict()
    for p in keep:
        o[p] = c[p]
    out.append(o)

open(out_file, 'wb').write(json.dumps(out))