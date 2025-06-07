#include <bits/stdc++.h>
using namespace std;

int N, row[24];


int main() {

	// 초기화 : 각 행에 T위치 정보를 하나의 숫자로 저장
	cin >> N;
	string str;
	for (int i = 1; i <= N; i++) {
		cin >> str;
		for (int j = 0; j < N; j++) {
			if (str[j] == 'T') {
				row[i] |= (1<<j);
			}
		}
	}

	

	// 현재 : 모든 경우의수 중 특정 행 중 True False가 겹치는지
	for(int i=0; i< (1<<N); i++) {
 		for(int j=0; j<N; j++) {
   			if(row[i] & (1<<j)) {
      				
      			}
   		}
 	}
 
	

}     
 
 
 
