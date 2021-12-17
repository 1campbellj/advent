data = File.read('test-a.input').split

nodes = {}

data.each do |p|
  n1, n2 = p.split('-')
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

@paths = []

def find_paths(nodes, current_node, path)
  # base case
  if current_node == 'end'
    @paths << path
    return
  end

  # dead end base case
  if nodes[current_node].empty?
    return
  end

  new_nodes = nodes.dup
  # only visit small caves once
  if current_node == current_node.downcase
    new_nodes.keys.map{|k| new_nodes[k] -= [current_node]}
  end

  next_nodes = nodes[current_node]
  next_nodes.each do |n|
    new_path = path.dup << n
    find_paths(new_nodes, n, new_path)
  end

end

find_paths(nodes, 'start', ['start'])


@paths.map{|p| puts p.to_s}
puts @paths.length
