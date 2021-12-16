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

puts lowest.map{ |p| data[p[0]][p[1]] + 1 }.reduce(:+)