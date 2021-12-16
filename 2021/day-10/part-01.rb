require 'set'

data = File.read('part-01.input').split.map(&:chomp)

puts data.to_s

syntax_map = {
  ')' => '(',
  '}' => '{',
  ']' => '[',
  '>' => '<'
}

score_map = {
  ')' => 3,
  ']' => 57,
  '}' => 1197,
  '>' => 25137
}

closers = Set.new(syntax_map.keys)
openers = Set.new(syntax_map.values)

corrupt_chars = []

data.each do |l|
  stack = []
  bad = ''
  l.split('').each do |s|
    if openers.include?(s)
      stack.push(s)
    else
      last_opener = stack.pop
      if syntax_map[s] != last_opener
        bad = s
        break;
      end
    end
  end
  corrupt_chars << bad if bad.length > 0
  puts "#{l}: #{bad.length > 0 ? 'unexpected ' + bad : 'incomplete'}"
end

puts corrupt_chars.map{|c| score_map[c]}.reduce(:+)


