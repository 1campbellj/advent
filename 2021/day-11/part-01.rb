@data = File.read('part-01.input').split.map{|e| e.split('').map(&:to_i)}
@num_flashes = 0

def flash(ri, ci)
  # out of bounds checks
  if ri < 0 || ri > @data.length - 1
    return
  end
  if ci < 0 || ci > @data[0].length - 1
    return
  end
  
  if @data[ri][ci] == 0
    # already flashed this step
    return
  end

  @data[ri][ci] += 1

  if @data[ri][ci] > 9
    @num_flashes += 1
    @data[ri][ci] = 0
    flash(ri-1, ci-1)
    flash(ri-1, ci)
    flash(ri-1, ci+1)
    flash(ri, ci-1)
    flash(ri, ci+1)
    flash(ri+1, ci-1)
    flash(ri+1, ci)
    flash(ri+1, ci+1)
  end

end

def step
  @data = @data.map{ |r| r.map(&1.method(:+)) }
  @data.each_with_index do |r, ri| 
    r.each_with_index do |c, ci|
      if c > 9
        flash(ri, ci)
      end
    end
  end
end

def print(m)
  m.map{|r| puts r.to_s}
  puts '***'
end

100.times do 
  print(@data)
  step
end

print(@data)
puts @num_flashes