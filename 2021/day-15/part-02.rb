cave = File.read('part-01.input').split.map{|r| r.split('').map(&:to_i)}

num_rows = cave.length
num_cols = cave[0].length
# generate full map
# add new columns
4.times do
  cave.each do |r|
    start = r.length - num_cols
    (start..(r.length-1)).each do |i|
      new_val = r[i] + 1
      new_val = 1 if new_val > 9
      r << new_val
    end
  end
end

# add new rows
4.times do 
  start = cave.length  - num_rows
  (start..(cave.length-1)).each do |i|
    cave << cave[i].map{|x| (x+1) > 9 ? 1 : x+1}
  end
end

puts cave.length
puts cave[0].length

cave.map{|x| puts x.join('')}

dp = []

cave.length.times do
  dp << Array.new(cave[0].length).fill(0)
end

# initialize top row of costs
dp[0][1] = cave[0][1]
(2..(cave[0].length-1)).each do |i|
  dp[0][i] = dp[0][i-1] + cave[0][i] 
end

# initialize left column of costs
dp[1][0] = cave[1][0]
(2..(cave.length-1)).each do |i|
  dp[i][0] = dp[i-1][0] + cave[i][0]
end

# walk the cave
(1..(cave.length-1)).each do |i|
  (1..(cave[0].length-1)).each do |j|
    dp[i][j] = cave[i][j] + [dp[i-1][j], dp[i][j-1]].min
  end
end

puts dp.last.last