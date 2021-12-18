@start, maps = File.read('part-01.input').split("\n\n")

@insert_map = {}
@counts = {}
@pairs = {}

def add_count(c, n)
  "Adding count #{c}, #{n} times"
  if @counts.keys.include?(c)
    @counts[c] += n
  else
    @counts[c] = n
  end
end

def add_pair(p, n)
  puts "Adding pair #{p}, #{n} times"
  if @pairs.keys.include?(p)
    @pairs[p] += n
  else
    @pairs[p] = n
  end
end

def remove_pair(p, n)
  if @pairs.keys.include?(p)
    @pairs[p] -= n

    @pairs.delete(p) if @pairs[p] <= 0
  end
end

maps.split("\n").each do |m|
  rule, insert = m.split(' -> ')
  @insert_map[rule] = insert
end

(0..@start.length - 2).each do |i|
  add_pair(@start[i..i+1], 1)
end

@start.split('').each do |c|
  add_count(c, 1)
end

def step
  spairs = Marshal.load(Marshal.dump(@pairs))

  spairs.keys.each do |p|
    l = @insert_map[p]
    if l
      add_count(l, spairs[p])
      remove_pair(p, spairs[p])
      add_pair(p[0] + l, spairs[p])
      add_pair(l + p[1], spairs[p])
    end
  end
end

40.times do
  step
end




vals = @counts.values.sort
puts vals[-1] - vals[0]

puts vals.reduce(:+)