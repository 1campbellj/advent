require 'set'

data = File.read('part-01.input').split.map(&:chomp)

syntax_map = {
  ')' => '(',
  '}' => '{',
  ']' => '[',
  '>' => '<'
}

score_map = {
  ')' => 1,
  ']' => 2,
  '}' => 3,
  '>' => 4
}

open_map = {
  '(' => ')',
  '{' => '}',
  '[' => ']',
  '<' => '>'
}

closers = Set.new(syntax_map.keys)
openers = Set.new(syntax_map.values)

incomplete = []

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
  incomplete << stack if bad.length == 0
end

to_complete = incomplete.map{|i| i.reverse.map{|r| open_map[r]}}

scores = []
to_complete.each do |chars|
  s = 0
  chars.each do |c|
    s = s*5 + score_map[c]
  end
  scores << s
end

puts scores.sort[scores.length/2]


