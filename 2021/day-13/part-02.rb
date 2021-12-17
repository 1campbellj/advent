points, folds = File.read('part-01.input').split("\n\n")
points = points.split
folds = folds.split("\n").map{|f| f.split(' ')[2].split('=')}
puts folds.to_s
# folds = folds.map{ |f| f.split(' ')[2].split('=')}
# puts folds.to_s

max_x = 0
max_y = 0
points.each do |p|
  x, y = p.split(',').map(&:to_i)
  max_x = x if x > max_x
  max_y = y if y > max_y
end

paper = []
(max_y + 1).times do 
  paper << Array.new(max_x + 1).fill(0)
end


points.each do |p|
  x, y = p.split(',').map(&:to_i)
  paper[y][x] = 1
end

def fold_x(paper, x)
  left = paper.map{|r| r[0..x-1]}
  right = paper.map{|r| r[x+1..r.length].reverse }

  if left[0].length < right[0].length
    pad = right[0].length - left[0].length

    left = left.map{|r| [Array.new(pad).fill(0), r].flatten }
  elsif right[0].length < left[0].length
    pad = left[0].length - right[0].length

    right = right.map{|r| [Array.new(pad).fill(0), r].flatten }
  end

  folded = []
  left.each_with_index do |v, i|
    # bitwise OR
    combined_row = v.join.to_i(2) | right[i].join.to_i(2)
    fixed_width = "%0#{v.length}b" % combined_row
    folded << fixed_width.split('').map(&:to_i)
  end

  return folded
end

def fold_y(paper, y)
  top = paper[0..y-1]
  bottom = paper[y+1..paper.length]

  bottom.reverse!

  while bottom.length < top.length
    bottom.prepend(Array.new(bottom[0].length).fill(0))
  end

  while top.length < bottom.length
    top.prepend(Array.new(bottom[0].length).fill(0))
  end

  folded = []
  top.each_with_index do |v, i|
    # bitwise OR
    combined_row = v.join.to_i(2) | bottom[i].join.to_i(2)
    fixed_width = "%0#{v.length}b" % combined_row
    folded << fixed_width.split('').map(&:to_i)
  end
  
  return folded
end

puts "folds: " + folds.to_s
# paper = fold_y(paper, 7)
# paper = fold_x(paper, 5)
folds.each do |d, n|
  if d == 'y'
    paper = fold_y(paper, n.to_i)
  elsif d == 'x'
    paper = fold_x(paper, n.to_i)
  end
end
puts 'result:'
paper.map{|x| puts x.join.gsub('0', '.').split(' ')}


