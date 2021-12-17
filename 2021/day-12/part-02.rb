require 'set'

data = File.read('part-01.input').split

nodes = {}

small_set = Set.new

data.each do |p|
  n1, n2 = p.split('-')
  small_set.add(n1) if n1.downcase == n1 && !['start', 'end'].include?(n1)
  small_set.add(n2) if n2.downcase == n2 && !['start', 'end'].include?(n1)
  if nodes[n1]
    nodes[n1] << n2 unless n2 == 'start'
  else
    nodes[n1] = [n2] unless n2 == 'start'
  end

  if nodes[n2]
    nodes[n2] << n1 unless n1 == 'start'
  else
    nodes[n2] = [n1] unless n1 == 'start'
  end
end
puts nodes.to_s
@paths = Set.new

def find_paths(nodes, current_node, path, double_visit)
  # base case
  if current_node == 'end'
    @paths << path
    return
  end

  # dead end base case
  if nodes[current_node].empty?
    return
  end

  new_nodes = Marshal.load(Marshal.dump(nodes))
  # only visit small caves once
  if current_node == current_node.downcase
    if current_node == double_visit
      double_visit = ''
    else
      new_nodes.keys.map{|k| new_nodes[k] -= [current_node]}
    end
  end

  next_nodes = new_nodes[current_node]
  next_nodes.each do |n|
    new_path = path.dup << n
    find_paths(new_nodes, n, new_path, double_visit)
  end

end

small_set.to_a.each do |s|
  find_paths(nodes.dup, 'start', ['start'], s)
end

# @paths.map{|p| puts p.to_s}
puts @paths.length
