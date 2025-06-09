#include <bits/stdc++.h> 
using namespace std;

int N, area[14], tmp;
vector<vector<int>> v(14);

int main() {

	cin >> N;
	for (int i = 1; i <= N; i++) {
		cin >> area[i];
	}

	for (int i = 1; i <= N; i++) {
		int adj = 0; cin >> adj;
		for (int j = 0; j < adj; j++) {
			cin >> tmp;
			v[i].push_back(tmp);
		}
	}

	for (int i = 0; i < v.size(); i++) {
		for (int j = 0; j < v[i].size(); j++) {
			cout << v[i][j] << " ";
		}
		cout << "\n";
	}

}
