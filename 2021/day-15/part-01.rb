cave = File.read('part-01.input').split.map{|r| r.split('').map(&:to_i)}

cave.map{|r| puts r.to_s}

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