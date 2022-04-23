//
// Created by luozhen on 2017/7/25.
//

#ifndef CODEFORCES_VASYA_AND_SHIFTS_H
#define CODEFORCES_VASYA_AND_SHIFTS_H

#endif //CODEFORCES_VASYA_AND_SHIFTS_H

//Vasya has a set of 4n strings of equal length, consisting of lowercase English letters "a", "b", "c", "d" and "e".
// Moreover, the set is split into n groups of 4 equal strings each. Vasya also has one special string a of the same length,
// consisting of letters "a" only.
//
//Vasya wants to obtain from string a some fixed string b, in order to do this, he can use the strings from his set
// in any order. When he uses some string x, each of the letters in string a replaces with the next letter in alphabet
// as many times as the alphabet position, counting from zero, of the corresponding letter in string x. Within this
// process the next letter in alphabet after "e" is "a".
//
// For example, if some letter in a equals "b", and the letter on the same position in x equals "c", then the letter
// in a becomes equal "d", because "c" is the second alphabet letter, counting from zero. If some letter in a equals "e",
// and on the same position in x is "d", then the letter in a becomes "c". For example, if the string a equals "abcde",
// and string x equals "baddc", then a becomes "bbabb".
//
//A used string disappears, but Vasya can use equal strings several times.
//
//Vasya wants to know for q given strings b, how many ways there are to obtain from the string a string b using the
// given set of 4n strings? Two ways are different if the number of strings used from some group of 4 strings is different.
// Help Vasya compute the answers for these questions modulo 109 + 7.
//
//Input
//The first line contains two integers n and m (1 ≤ n, m ≤ 500) — the number of groups of four strings in the set, and
// the length of all strings.
//
//Each of the next n lines contains a string s of length m, consisting of lowercase English letters "a", "b", "c", "d"
// and "e". This means that there is a group of four strings equal to s.
//
//The next line contains single integer q (1 ≤ q ≤ 300) — the number of strings b Vasya is interested in.
//
//Each of the next q strings contains a string b of length m, consisting of lowercase English letters "a", "b", "c", "

int vas_solution(){

}