#include <bits/stdc++.h> 
using namespace std;

int N, row[24];
int mn = 987654321;

void go(int now) {
	if (now == N+1) {
		int sum = 0;

		// 현재 : 모든 경우의수 중 특정 행 중 True False가 겹치는지
		for (int i = 1; i < (1 << N); i++) {
			int cnt = 0;
			for (int j = 0; j < N; j++) {
				if (row[i] & (1 << j)) {
					cnt++;
				}
			}
			sum += min(cnt, N - cnt);
		}
		mn = min(sum, mn);
		return;
	}


	go(now + 1);
	row[now] = ~row[now];
	go(now + 1);

}

int main() {

	// 초기화 : 각 행에 T위치 정보를 하나의 숫자로 저장
	cin >> N;
	string str;
	for (int i = 1; i <= N; i++) {
		cin >> str;
		for (int j = 0; j < N; j++) {
			if (str[j] == 'T') {
				row[i] |= (1 << j);
			}
		}
	}

	go(1);

	cout << mn;

}
