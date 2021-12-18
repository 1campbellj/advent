@start, maps = File.read('part-01.input').split("\n\n")

@insert_map = {}

maps.split("\n").each do |m|
  puts m.to_s
  rule, insert = m.split(' -> ')
  @insert_map[rule] = insert
end

puts @insert_map.to_s


def step
  poly = ''
  (0..@start.length-2).each do |i|
    pair = @start[i..i+1]
    if @insert_map[pair]
      poly += pair[0] + @insert_map[pair]
    else
      poly += pair[0]
    end
  end
  @start = poly + @start[-1]
end


10.times do
  step
end

counts = {}
@start.split('').each do |c|
  if counts[c]
    counts[c] += 1
  else
    counts[c] = 1
  end
end

vals = counts.values.sort
puts vals[-1] - vals[0]