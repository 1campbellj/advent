data = File.read('part-01.input').split.map{ |r| r.split('').map(&:to_i) }

# puts data.to_s

lowest = []

data.each_with_index do |r, ri|
  r.each_with_index do |c, ci|
    if ri > 0 # check above
      next unless data[ri-1][ci] > c 
    end
    if ri < data.length - 1  # check below
      next unless data[ri+1][ci] > c
    end
    if ci > 0 # check left
      next unless data[ri][ci-1] > c
    end
    if ci < r.length - 1  # check right
      next unless data[ri][ci + 1] > c
    end
    lowest << [ri, ci]
  end
end


def basin_size(p, m, dp)
  # base case
  if p[0] < 0 || p[0] >= m.length
    return 0
  elsif m[p[0]][p[1]] == 9
    return 0
  elsif p[1] < 0 || p[1] >= m[0].length
    return 0
  elsif !dp[p[0]][p[1]].nil?
    # point has already been counted
    return 0
  end

  dp[p[0]][p[1]] = '*'

  return 1 + basin_size([p[0] + 1 , p[1]], m, dp) + basin_size([p[0] - 1 , p[1]], m, dp) + basin_size([p[0], p[1] + 1] , m, dp)+ basin_size([p[0], p[1] - 1], m, dp)
end

dp = []
data.length.times do
  dp << Array.new(data[0].length).fill(nil)
end

basin_sizes = lowest.map{ |p| basin_size(p, data, dp) }

puts basin_sizes.sort.last(3).reduce(:*)


