# 네트워크관리사 2급 실기 — 기출/복원 자료 정리

출처: [우진아빠의 네트워크 실무 — 네트워크 관리사 2급 (필기,실기)](https://tech-network.tistory.com/category/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%20%EA%B4%80%EB%A6%AC%EC%82%AC%202%EA%B8%89%20(%ED%95%84%EA%B8%B0%2C%EC%8B%A4%EA%B8%B0))

카테고리 1~44페이지 전체를 수집한 **260편**을 분야별로 정리했다. 이 중 **단답형·선택형 / 리눅스 명령어** 는 `network_2_practical` 문제은행(주관식 70 · 4지선다 10)에 수록했고, 나머지(NOS 서버 설정·라우터 설정·서브넷 계산·케이블 제작)는 화면 조작이나 손 계산이 필요해 링크로만 정리했다.

| 분야 | 편수 | 처리 |
| --- | --- | --- |
| 단답형 및 선택형 | 67 | 문제은행 수록(주관식 위주) |
| 리눅스 | 19 | 문제은행 수록(주관식 위주) |
| NOS | 52 | 링크만 — 서버 GUI 설정 실습 |
| Router 설정 | 52 | 일부 문제은행 수록 + 링크 |
| 서브넷 마스크 및 IP address (필기,실기) | 52 | 일부 문제은행 수록 + 링크 |
| 케이블 제작 | 16 | 링크만 — 결선 실습 |
| 기타 | 2 | 링크만 — 회차 복원/모의고사 |

---

## 1. 단답형 · 선택형 (문제은행 수록)

실기 2~6번에 해당하는 유형. 여기 있는 개념은 `network_2_practical` 모의고사에서 답을 직접 입력해 풀 수 있다. 원문이 '옳지 않은 것을 고르시오' 형태였던 문항만 4지선다로 남겼다.

### IPv6 · IP 주소 체계 (10편)

- [네트워크 관리사 2급실기 - 선형 (IPv6의 특징-3)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%98%95-IPv6%EC%9D%98-%ED%8A%B9%EC%A7%95-3) `2026.7.7`
- [네트워크 관리사 2급 실기 - 단답형 (네트워크 ID 구하기)- B Class](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-ID-%EA%B5%AC%ED%95%98%EA%B8%B0) `2025.4.11`
- [네트워크 관리사 2급실기 - 선택형 (A Class)문제](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-A-Class%EB%AC%B8%EC%A0%9C) `2024.12.5`
- [네트워크 관리사 2급실기 - 단답형 (IPv6의 특징-2)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-IPv6%EC%9D%98-%ED%8A%B9%EC%A7%95) `2024.11.29`
- [네트워크 관리사 2급 실기 - 선택형 (IPv6의 특징-1)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-IPv6%EC%9D%98-%ED%8A%B9%EC%A7%95) `2024.11.21`
- [네트워크 관리사 2급실기 (선택형) - 네트워크 수 구하기](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%88%98-%EA%B5%AC%ED%95%98%EA%B8%B0) `2024.4.11`
- [네트워크 관리사 2급 실기 (선택형) - IPv6](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-IPv6) `2024.4.9`
- [네트워크 관리사 2급실기 - 선택형 (B Class)문제](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-IP-Class%EB%AC%B8%EC%A0%9C) `2023.12.1`
- [네트워크 관리사 2급 실기 단답형 - Dual Stack](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-Dual-Stack) `2023.4.3`
- [네트워크 관리사 2급실기 단답형 - IPV4에서 IPV6로 넘어가기 위한 기술들](https://tech-network.tistory.com/entry/IPV4%EC%97%90%EC%84%9C-IPV6%EB%A1%9C-%EB%84%98%EC%96%B4%EA%B0%80%EA%B8%B0-%EC%9C%84%ED%95%9C-%EA%B8%B0%EC%88%A0%EB%93%A4) `2022.11.14`

### 프로토콜 · OSI 계층 (20편)

- [[문제복원] 네트워크 관리사 2급 실기 선택형 (arp)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-arp) `2026.4.17`
- [[문제복원] 네트워크 관리사 2급 실기 선택형 (UDP) - 유형2](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-UDP-%EC%9C%A0%ED%98%952) `2026.3.13`
- [[문제복원] 네트워크 관리사 2급 실기 선택형 (UDP) - 유형1](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-UDP-1) `2025.9.12`
- [네트워크 관리사 2급 실기 - 단답형 (라우팅 프로토콜)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-%EB%9D%BC%EC%9A%B0%ED%8C%85-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C) `2024.12.26`
- [[문제복원] 네트워크 관리사 2급 실기 선택형 (SSL)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-SSL) `2024.12.12`
- [네트워크관리사 2급 실기 선택형 (4계층의 특징 선택) - 문제수정](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-4%EA%B3%84%EC%B8%B5%EC%9D%98-%ED%8A%B9%EC%A7%95-%EC%84%A0%ED%83%9D) `2024.11.22`
- [[문제복원] 네트워크 관리사 2급 실기 - 선택형 (OSI7계층 - 4계층)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-OSI7%EA%B3%84%EC%B8%B5-4%EA%B3%84%EC%B8%B5) `2024.9.6`
- [네트워크 관리사 2급실기 - 단답형 (DHCP)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-DHCP) `2024.9.5`
- [네트워크 관리사 2급실기 - 단답형 (echo)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-echo) `2024.9.3`
- [네트워크 관리사 2급실기 - 선택형 (라우팅프로토콜)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-IPv6-%EA%B4%80%EB%A0%A8) `2024.5.11`
- [네트워크 관리사 2급실기 선택형 (라우팅- 프로토콜)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-%EB%9D%BC%EC%9A%B0%ED%8C%85-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C) `2024.5.10`
- [네트워크 관리사 2급실기 선택형 (OSI7- 프로토콜)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-OSI7-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C) `2024.4.12`
- [네트워크 관리사 2급실기 단답형 (HTTPS)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-HTTPS) `2024.3.12`
- [네트워크 관리사 2급실기 선택형 (SCTP)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-SCTC) `2023.9.2`
- [네트워크 관리사2급 실기 - 명령프롬프트 문제 ( arp 삭제)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%AA%85%EB%A0%B9%ED%94%84%EB%A1%AC%ED%94%84%ED%8A%B8-%EB%AC%B8%EC%A0%9C) `2023.6.16`
- [네트워크 관리사2급 실기 - 용어 선택형 문제](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%9A%A9%EC%96%B4-%EC%84%A0%ED%83%9D%ED%98%95-%EB%AC%B8%EC%A0%9C) `2023.6.15`
- [네트워크 관리사 2급 실기 Drag & Drop 문제 복원 (장비와 프로토콜)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-Drag-Drop-%EB%AC%B8%EC%A0%9C-%EB%B3%B5%EC%9B%90-%EC%9E%A5%EB%B9%84%EC%99%80-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C) `2023.5.17`
- [네트워크 관리사 2급 실기 문제 단답형 - OSI 7계층(1)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%AC%B8%EC%A0%9C-%EB%8B%A8%EB%8B%B5%ED%98%95-OSI-7%EA%B3%84%EC%B8%B51) `2023.4.16`
- [네트워크 관리사 2급 실기 단답형 (SSL, https)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-SSL-https) `2023.4.4`
- [네트워크 관리사 2급 실기 단답형 - ICMP 프로토콜](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-ICMP-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C) `2022.11.13`

### 보안 · 보안 장비 (8편)

- [[문제복원] 네트워크 관리사 2급 실기 선택형 (Honey Pot)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-Honey-Pot) `2025.8.21`
- [네트워크 관리사 2급 실기 - 선택형 (ipsec)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%84%A0%ED%83%9D%ED%98%95-ipsec) `2024.10.18`
- [네트워크 관리사 2급 실기 단답형 - IPS](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-IPS) `2023.3.19`
- [네트워크 관리사 2급 실기문제 단답형 -웹방화벽(WAF)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0%EB%AC%B8%EC%A0%9C-%EB%8B%A8%EB%8B%B5%ED%98%95-%EC%9B%B9%EB%B0%A9%ED%99%94%EB%B2%BD-WAF) `2023.2.13`
- [네트워크 관리사 2급 실기 단답형 - VPN](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-VPN) `2023.1.4`
- [네트워크 관리사 2급 실기 단답형 - NAT](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0%EC%A3%BC%EA%B4%80%EC%8B%9D-%EB%8B%A8%EB%8B%B5%ED%98%95%EB%AC%B8%EC%A0%9C-NAT) `2022.11.7`
- [네트워크관리사 2급 실기 단답형 - ipsec](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95ipsec) `2022.11.1`
- [네트워크관리사 2급 실기 단답형 - DMZ](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0%EB%8B%A8%EB%8B%B5%ED%98%95-%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4-DMZ) `2022.11.1`

### 스위치 · 장비 · 저장장치 (14편)

- [네트워크관리사2급  단답형 - 라우터 내부구조](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC2%EA%B8%89-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EB%82%B4%EB%B6%80%EA%B5%AC%EC%A1%B0-%ED%8C%8C%EC%95%85) `2023.6.7`
- [네트워크 관리사 2급 실기 (단답형 - 더미, 스위치)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-%EB%8D%94%EB%AF%B8-%EC%8A%A4%EC%9C%84%EC%B9%98) `2023.4.28`
- [네트워크 관리사 2급실기 단답형 문제 - Looping, STP](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-%EB%AC%B8%EC%A0%9C-Looping-STP) `2023.3.19`
- [네트워크 관리사 2급 실기 (단답형) -Ethernet, Serial 포트](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-Ethernet-Serial-%ED%8F%AC%ED%8A%B8) `2023.3.19`
- [네트워크 관리사 2급 실기 단답형문제 (Trunk)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95%EB%AC%B8%EC%A0%9C-Trunk) `2023.3.12`
- [네트워크 관리사 2급 실기 단답형 - Rack](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-Rack) `2023.3.4`
- [네트워크 관리사 2급 실기 단답형 - QOS](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-QOS) `2023.2.14`
- [네트워크 관리사 2급실기 단답형 - VTP](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-VTP) `2023.2.14`
- [네트워크 관리사 2급 단답형 - RAID](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EB%8B%A8%EB%8B%B5%ED%98%95-RAID-%EA%B4%80%EB%A0%A8-%EB%AC%B8%EC%A0%9C) `2022.12.26`
- [[문제복원] 네트워크 관리사 2급 실기 단답형 - POE 스위치](https://tech-network.tistory.com/entry/POE-%EC%8A%A4%EC%9C%84%EC%B9%98) `2022.12.21`
- [NAS와 SAN의 비교](https://tech-network.tistory.com/entry/NAS%EC%99%80-SAN%EC%9D%98-%EB%B9%84%EA%B5%90) `2022.11.15`
- [저장장치 SAN 이야기](https://tech-network.tistory.com/entry/%EC%A0%80%EC%9E%A5%EC%9E%A5%EC%B9%98-SAN-%EC%9D%B4%EC%95%BC%EA%B8%B0) `2022.11.15`
- [[문제복원] 네트워크 관리사 2급 실기 (NAS)](https://tech-network.tistory.com/entry/%EC%A0%80%EC%9E%A5%EC%9E%A5%EC%B9%98-NAS-%EC%9D%B4%EC%95%BC%EA%B8%B0) `2022.11.15`
- [DDNS란? 무엇인가? DDNS는 신의 한수?](https://tech-network.tistory.com/entry/DDNS%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-DDNS%EB%8A%94-%EC%8B%A0%EC%9D%98-%ED%95%9C%EC%88%98) `2022.11.14`

### IP 계산형 단답 (4편)

- [네트워크관리사 2급 실기문제 - 브로드캐스트 IP 주소 구하기(02)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0%EB%AC%B8%EC%A0%9C-%EB%B8%8C%EB%A1%9C%EB%93%9C%EC%BA%90%EC%8A%A4%ED%8A%B8-IP-%EC%A3%BC%EC%86%8C-%EA%B5%AC%ED%95%98%EA%B8%B002) `2025.12.2`
- [네트워크 관리사 2급 실기 - 단답형 (브로드캐스트 주소 구하기)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-%EB%B8%8C%EB%A1%9C%EB%93%9C%EC%BA%90%EC%8A%A4%ED%8A%B8-%EC%A3%BC%EC%86%8C-%EA%B5%AC%ED%95%98%EA%B8%B0) `2025.7.11`
- [네트워크 관리사 2급 실기 - 단답형 (네트워크 ID, 브로드캐스트 주소 구하기)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-ID-%EB%B8%8C%EB%A1%9C%EB%93%9C%EC%BA%90%EC%8A%A4%ED%8A%B8-%EC%A3%BC%EC%86%8C-%EA%B5%AC%ED%95%98%EA%B8%B0) `2024.11.5`
- [네트워크관리사 2급 실기문제 - 브로드캐스트 IP 주소 구하기](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0%EB%AC%B8%EC%A0%9C-%EB%B8%8C%EB%A1%9C%EB%93%9C%EC%BA%90%EC%8A%A4%ED%8A%B8-IP-%EC%A3%BC%EC%86%8C-%EA%B5%AC%ED%95%98%EA%B8%B0) `2023.4.18`

### Drag & Drop · 명령어 · 기타 (11편)

- [네트워크 관리사 2급 실기 - 선택형 (포트선택)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%84%A0%ED%83%9D%ED%98%95-%ED%8F%AC%ED%8A%B8%EC%84%A0%ED%83%9D) `2024.11.8`
- [네트워크 관리사 2급실기 단답형 (Raid 1)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-RAID1) `2023.9.3`
- [네트워크 관리사 2급 실기 (단답형 - 쿠키,cookie)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-%EC%BF%A0%ED%82%A4cookie) `2023.6.14`
- [네트워크 관리사 2급실기문제 단답형 (getmac)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0%EB%AC%B8%EC%A0%9C-getmac) `2023.4.16`
- [네트워크 관리사 2급 실기 Drag & Drop 문제 -  통신포트 선택](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-Drag-Drop-%EB%AC%B8%EC%A0%9C-%ED%86%B5%EC%8B%A0%ED%8F%AC%ED%8A%B8-%EC%84%A0%ED%83%9D) `2023.4.12`
- [네트워크 관리사 2급 실기 단답형 (tracert)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-tracert) `2023.4.11`
- [네트워크 관리사 2급 실기 단답형  (ping)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-ping) `2023.4.11`
- [네트워크 관리사 2급 실기 단답형 (RIP)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-RIP) `2023.4.10`
- [네트워크 관리사 2급실기 (정적 라우팅)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EC%A0%95%EC%A0%81-%EB%9D%BC%EC%9A%B0%ED%8C%85) `2023.3.19`
- [네트워크관리사 2급 실기문제 단답형 - OSPF](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0%EB%AC%B8%EC%A0%9C-OSPF) `2022.12.23`
- [네트워크 관리사 2급 실기 단답형 - ping 관련 옵션 기능](https://tech-network.tistory.com/entry/ping-%EA%B4%80%EB%A0%A8-%EC%98%B5%EC%85%98-%EA%B8%B0%EB%8A%A5-%EC%95%8C%EB%A6%BC) `2022.12.20`

---

## 2. 리눅스 명령어 (문제은행 수록)

실기 NOS 문항 중 리눅스 단답형. 모두 주관식으로 수록했고, 실제 시험처럼 **대소문자까지 채점**하므로 소문자로 입력해야 정답 처리된다.

### 파일 · 디렉터리 · 권한 (5편)

- [네트워크 관리사 2급 실기 - 단답형 (df)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95-df) `2025.4.8`
- [네트워크 관리사 - 리눅스 단답형 (권한설정)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%EB%8B%A8%EB%8B%B5%ED%98%95-%EA%B6%8C%ED%95%9C%EC%84%A4%EC%A0%95) `2024.7.30`
- [네트워크 관리사 - 리눅스 단답형 (pwd)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%EB%8B%A8%EB%8B%B5%ED%98%95-pwd) `2024.3.7`
- [네트워크 관리사 - 리눅스에서 설치(install) 명령어](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4%EC%97%90%EC%84%9C-%ED%8C%8C%EC%9D%BC%EC%B0%BE%EA%B8%B0install-%EB%AA%85%EB%A0%B9%EC%96%B4) `2023.9.13`
- [네트워크 관리사 - 리눅스에서 파일찾기(find) 명령어](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4%EC%97%90%EC%84%9C-%ED%8C%8C%EC%9D%BC%EC%B0%BE%EA%B8%B0find-%EB%AA%85%EB%A0%B9%EC%96%B4) `2023.6.18`

### 프로세스 · 시스템 종료 (5편)

- [네트워크 관리사 - 리눅스 단답형 (&)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%EB%8B%A8%EB%8B%B5%ED%98%95) `2024.3.29`
- [네트워크 관리사 - 리눅스에서 init 옵션 (종료관련)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4%EC%97%90%EC%84%9C-init-%EC%98%B5%EC%85%98-%EC%A2%85%EB%A3%8C%EA%B4%80%EB%A0%A8) `2023.11.29`
- [네트워크 관리사 - 리눅스 선택형 (Drag & Drop) 문제](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%EC%84%A0%ED%83%9D%ED%98%95-Drag-Drop-%EB%AC%B8%EC%A0%9C) `2023.10.8`
- [네트워크 관리사 - 리눅스에서 프로세스 확인(ps) & 죽이기 (kill) 명령어](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4%EC%97%90%EC%84%9C-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%ED%99%95%EC%9D%B8ps-%EC%A3%BD%EC%9D%B4%EA%B8%B0-kill-%EB%AA%85%EB%A0%B9%EC%96%B4) `2023.6.13`
- [네트워크 관리사 - 리눅스에서 cpu 점유율 및 메모리 정보를 확인하는 명령어를 기술하시오. (대소문자 주의)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4%EC%97%90%EC%84%9C-cpu-%EC%A0%90%EC%9C%A0%EC%9C%A8-%EB%B0%8F-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EC%A0%95%EB%B3%B4%EB%A5%BC-%ED%99%95%EC%9D%B8%ED%95%98%EB%8A%94-%EB%AA%85%EB%A0%B9%EC%96%B4%EB%A5%BC-%EA%B8%B0%EC%88%A0%ED%95%98%EC%8B%9C%EC%98%A4-%EB%8C%80%EC%86%8C%EB%AC%B8%EC%9E%90-%EC%A3%BC%EC%9D%98) `2023.4.8`

### 네트워크 · 계정 (8편)

- [네트워크 관리사 - 리눅스 선택형 (고정IP)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%EC%84%A0%ED%83%9D%ED%98%95-%EA%B3%A0%EC%A0%95IP) `2024.9.7`
- [네트워크 관리사 - 리눅스에서 옵션 (icmp관련 2번째)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4%EC%97%90%EC%84%9C-%EC%98%B5%EC%85%98-icmp%EA%B4%80%EB%A0%A8-2%EB%B2%88%EC%A7%B8) `2024.8.2`
- [네트워크 관리사 2급실기 - 리눅스 단답형 (passwd)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%EB%8B%A8%EB%8B%B5%ED%98%95-passwd) `2024.7.11`
- [네트워크 관리사 - 리눅스 단답형 (분석)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%EB%8B%A8%EB%8B%B5%ED%98%95-%EB%B6%84%EC%84%9D) `2024.6.7`
- [네트워크 관리사 - 리눅스 단답형 (netstat)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%EB%8B%A8%EB%8B%B5%ED%98%95-netstat) `2024.5.25`
- [네트워크 관리사 - 리눅스에서 옵션 (icmp관련)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4%EC%97%90%EC%84%9C-%EC%98%B5%EC%85%98-icmp%EA%B4%80%EB%A0%A8) `2024.1.4`
- [네트워크 관리사 - 리눅스 포트 선택형 문제](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%ED%8F%AC%ED%8A%B8-%EC%84%A0%ED%83%9D%ED%98%95-%EB%AC%B8%EC%A0%9C) `2023.10.2`
- [네트워크 관리사 - 리눅스에서 ip address 정보를 확인하는 명령어를 기술하시오 (대소문자 주의)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4%EC%97%90%EC%84%9C-ip-address-%EC%A0%95%EB%B3%B4%EB%A5%BC-%ED%99%95%EC%9D%B8%ED%95%98%EB%8A%94-%EB%AA%85%EB%A0%B9%EC%96%B4%EB%A5%BC-%EA%B8%B0%EC%88%A0%ED%95%98%EC%8B%9C%EC%98%A4-%EB%8C%80%EC%86%8C%EB%AC%B8%EC%9E%90-%EC%A3%BC%EC%9D%98) `2023.4.4`

### 기타 (1편)

- [네트워크 관리사 - 리눅스 단답형 (man)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%EB%8B%A8%EB%8B%B5%ED%98%95-man) `2024.3.22`

---

## 3. NOS — Windows 서버 설정 (직접 보기)

실기 7~8번 유형. 서버 관리자 GUI 화면을 그대로 따라가야 하는 문제라 링크로만 정리했다. 회차별로 값(포트·경로·정책 이름)만 바뀌므로 **같은 주제의 최신 글부터** 보는 것이 좋다.

### DNS 설정 (6편)

- [네트워크 관리사 실기 - DNS 설정문제 (06)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-DNS-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-06) `2024.8.6`
- [네트워크 관리사 실기 - DNS 설정문제 (05)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-DNS-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-05) `2024.2.6`
- [네트워크 관리사 실기 - DNS 설정문제 (04)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-DNS-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-04) `2023.11.18`
- [네트워크 관리사 실기 - DNS 설정문제 (03)](https://tech-network.tistory.com/entry/DNS-%EC%84%A4%EC%A0%95-03) `2023.9.21`
- [네트워크 관리사 실기 -  DNS 설정문제 (02)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-DNS-%EC%84%A4%EC%A0%95-02) `2023.8.9`
- [네트워크 관리사 실기 -  DNS 설정문제 (01)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-DNS-%EC%84%A4%EC%A0%95-01) `2023.8.8`

### DHCP 설정 (6편)

- [네트워크 관리사 실기 - DHCP 설정문제 (06)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-DHCP-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-06) `2026.3.6`
- [네트워크 관리사 실기 - DHCP 설정문제 (05)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-DHCP-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-05) `2024.12.10`
- [네트워크 관리사 실기 - DHCP 설정문제 (04)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-DHCP-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-04) `2023.10.30`
- [네트워크 관리사 실기 - DHCP 설정문제 (03)](https://tech-network.tistory.com/entry/DHCP-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-03) `2023.9.12`
- [네트워크 관리사 실기 -  DHCP 설정문제 (02)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-DHCP-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-02) `2023.8.7`
- [네트워크 관리사 실기 -  DHCP 설정문제 (01)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-NOS-DHCP-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C) `2023.7.23`

### FTP 설정 (7편)

- [네트워크 관리사 실기 - FTP설정문제 (07)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-FTP%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-07) `2026.1.6`
- [네트워크 관리사 실기 - FTP설정문제 (06)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-FTP%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-06) `2024.5.7`
- [네트워크 관리사 실기 - FTP설정문제 (05)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-FTP%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-05) `2024.3.24`
- [네트워크 관리사 실기 - FTP설정문제 (04)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-FTP%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-04) `2024.1.12`
- [네트워크 관리사 실기 - FTP 설정문제 (03)](https://tech-network.tistory.com/entry/FTP-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C2) `2023.9.9`
- [네트워크 관리사 실기 -  FTP설정문제 (02)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-FTP-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C2) `2023.8.4`
- [네트워크 관리사 실기 -  FTP 설정문제 (01)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-FTP-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C) `2023.7.24`

### Web(IIS) 설정 (8편)

- [네트워크 관리사 실기 - Web 설정문제 (08)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-Web-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-08) `2025.3.28`
- [네트워크 관리사 실기 - Web 설정문제 (07)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-Web-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-07) `2024.6.8`
- [네트워크 관리사 실기 - Web 설정문제 (06)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-Web-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-06) `2024.6.7`
- [네트워크 관리사 실기 - Web 설정문제 (05)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-Web-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-05) `2023.12.15`
- [네트워크 관리사 실기 - Web 설정문제 (04)](https://tech-network.tistory.com/entry/Web-%EC%84%A4%EC%A0%95-04) `2023.9.22`
- [네트워크 관리사 실기 - Web 설정문제 (03)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-Web-%EC%84%A4%EC%A0%95-02) `2023.8.12`
- [네트워크 관리사 실기 -  Web 설정문제 (02)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-Web-%EC%84%A4%EC%A0%95-03) `2023.8.10`
- [네트워크 관리사 실기 -  Web 설정문제 (01)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-Web-%EC%84%A4%EC%A0%95-01) `2023.8.6`

### Service(서비스) 설정 (9편)

- [[문제복원] 네트워크 관리사 실기 - Service 설정문제(09)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-Service-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C09) `2026.7.10`
- [네트워크 관리사 실기 - Service 설정문제(07)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-Service-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C07) `2024.8.8`
- [네트워크 관리사 실기 - Service 설정문제(08)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-Service-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C08) `2024.6.20`
- [네트워크 관리사 실기 - Service 설정문제(06)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-Service-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C06) `2024.3.28`
- [네트워크 관리사 실기 - Service 설정문제 (05)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-Service-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C05) `2023.11.16`
- [네트워크 관리사 실기 - Service 설정문제 (04)](https://tech-network.tistory.com/entry/Service-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C04) `2023.9.23`
- [네트워크 관리사 실기 - Service 설정문제 (03)](https://tech-network.tistory.com/entry/Service-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C03) `2023.9.19`
- [네트워크 관리사 실기 -  Service 설정문제 (02)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-Service-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C2) `2023.8.1`
- [네트워크 관리사 실기 -  Service 설정문제 (01)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-NOS-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C) `2023.7.12`

### 계정 추가 · 권한 (8편)

- [네트워크 관리사 실기 - 계정추가 설정 (07)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EA%B3%84%EC%A0%95%EC%B6%94%EA%B0%80-%EC%84%A4%EC%A0%95-07) `2026.8.7`
- [네트워크 관리사 실기 - 계정추가 설정 (06)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EA%B3%84%EC%A0%95%EC%B6%94%EA%B0%80-%EC%84%A4%EC%A0%95-06) `2024.9.19`
- [네트워크 관리사 실기 - 계정추가 설정 (05)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EA%B3%84%EC%A0%95%EC%B6%94%EA%B0%80-%EC%84%A4%EC%A0%95-05) `2024.5.30`
- [[구독자요청] 계정 및 권한 설정](https://tech-network.tistory.com/entry/%EA%B5%AC%EB%8F%85%EC%9E%90%EC%9A%94%EC%B2%AD-%EA%B3%84%EC%A0%95%EA%B6%8C%ED%95%9C-%EC%9D%B4%EC%95%BC%EA%B8%B0) `2024.3.12`
- [네트워크 관리사 실기 - 계정추가 설정 (04)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EA%B3%84%EC%A0%95%EC%B6%94%EA%B0%80-%EC%84%A4%EC%A0%95-04) `2024.2.27`
- [네트워크 관리사 실기 - 계정추가 설정 (03)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EA%B3%84%EC%A0%95%EC%B6%94%EA%B0%80-%EC%84%A4%EC%A0%95-03) `2023.11.25`
- [네트워크 관리사 실기 - 계정추가 설정 (02)](https://tech-network.tistory.com/entry/%EA%B3%84%EC%A0%95%EC%B6%94%EA%B0%80-%EC%84%A4%EC%A0%95-02) `2023.8.28`
- [네트워크 관리사 실기 - 계정추가 설정 (01)](https://tech-network.tistory.com/entry/%EA%B3%84%EC%A0%95%EC%B6%94%EA%B0%80-%EC%84%A4%EC%A0%95-01) `2023.8.24`

### 로컬 보안 정책 (7편)

- [네트워크 관리사 실기 - 로컬보안정책 문제 (08)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EB%A1%9C%EC%BB%AC%EB%B3%B4%EC%95%88%EC%A0%95%EC%B1%85-%EB%AC%B8%EC%A0%9C-08) `2026.7.24`
- [네트워크 관리사 실기 - 로컬보안정책 문제 (07)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EB%A1%9C%EC%BB%AC%EB%B3%B4%EC%95%88%EC%A0%95%EC%B1%85-%EB%AC%B8%EC%A0%9C-07) `2025.9.23`
- [네트워크 관리사 실기 - 로컬보안정책 문제 (05)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EB%A1%9C%EC%BB%AC%EB%B3%B4%EC%95%88%EC%A0%95%EC%B1%85-%EB%AC%B8%EC%A0%9C-05) `2024.11.26`
- [네트워크 관리사 실기 - 로컬보안정책 문제 (04)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EB%A1%9C%EC%BB%AC%EB%B3%B4%EC%95%88%EC%A0%95%EC%B1%85-%EB%AC%B8%EC%A0%9C-04) `2024.1.25`
- [네트워크 관리사 실기 - 로컬보안정책 문제 (03)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EB%A1%9C%EC%BB%AC%EB%B3%B4%EC%95%88%EC%A0%95%EC%B1%85-%EB%AC%B8%EC%A0%9C-03) `2023.10.24`
- [네트워크 관리사 실기 - 로컬보안정책 문제 (02)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%A1%9C%EC%BB%AC%EB%B3%B4%EC%95%88%EC%A0%95%EC%B1%85-02) `2023.8.26`
- [네트워크 관리사 실기 - 로컬보안정책 문제 (01)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%A1%9C%EC%BB%AC%EB%B3%B4%EC%95%88%EC%A0%95%EC%B1%85-01) `2023.8.11`

### 기타 · 환경 구축 (1편)

- [네트워크관리사 2급 실기 NOS 풀이를 위한 에뮬레이터 설치방법](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-NOS-%ED%92%80%EC%9D%B4%EB%A5%BC-%EC%9C%84%ED%95%9C-%EC%97%90%EB%AE%AC%EB%A0%88%EC%9D%B4%ED%84%B0-%EC%84%A4%EC%B9%98%EB%B0%A9%EB%B2%95) `2023.7.10`

---

## 4. 라우터 설정 (직접 보기 — 일부는 문제은행 수록)

실기 9~10번 유형. 명령어 자체는 주관식으로 문제은행에 넣었지만, **에뮬레이터에 직접 쳐 보는 연습**이 필요하다. `no shutdown` 누락, `line vty 0 4` 띄어쓰기, `copy run start` 저장이 대표적인 감점 포인트다.

### show 계열 확인 명령어 (11편)

- [라우터 show 관련 명령어 모음7 (접속한 user 확인)](https://tech-network.tistory.com/entry/%EB%9D%BC%EC%9A%B0%ED%84%B0-show-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C7-%EC%A0%91%EC%86%8D%ED%95%9C-user-%ED%99%95%EC%9D%B8) `2024.6.22`
- [네트워크 관리사 2급 실기 [라우터] Router의 host를 확인하는 확인하는 명령어는?](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-Router%EC%9D%98-host%EB%A5%BC-%ED%99%95%EC%9D%B8%ED%95%98%EB%8A%94-%ED%99%95%EC%9D%B8%ED%95%98%EB%8A%94-%EB%AA%85%EB%A0%B9%EC%96%B4%EB%8A%94) `2023.12.28`
- [네트워크 관리사 2급 실기 [라우터] Router의 라우팅 테이블(Routing Table)을 확인하는 확인하는 명령어는?](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-Router%EC%9D%98-%EB%9D%BC%EC%9A%B0%ED%8C%85-%ED%85%8C%EC%9D%B4%EB%B8%94Routing-Table%EC%9D%84-%ED%99%95%EC%9D%B8%ED%95%98%EB%8A%94-%ED%99%95%EC%9D%B8%ED%95%98%EB%8A%94-%EB%AA%85%EB%A0%B9%EC%96%B4%EB%8A%94) `2023.11.26`
- [네트워크 관리사 2급 실기 [라우터] CPU의 Process 상태를 확인하는 명령어는?](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-CPU%EC%9D%98-Process-%EC%83%81%ED%83%9C%EB%A5%BC-%ED%99%95%EC%9D%B8%ED%95%98%EB%8A%94-%EB%AA%85%EB%A0%B9%EC%96%B4%EB%8A%94) `2023.11.7`
- [네트워크 관리사 2급 실기 [라우터] 모든 인터페이스를 보여주는 명령어를 기술하시오](https://tech-network.tistory.com/entry/%EB%9D%BC%EC%9A%B0%ED%84%B0-%EB%AA%A8%EB%93%A0-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%A5%BC-%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94-%EB%AA%85%EB%A0%B9%EC%96%B4%EB%A5%BC-%EA%B8%B0%EC%88%A0%ED%95%98%EC%8B%9C%EC%98%A4) `2023.10.21`
- [라우터 show 관련 명령어 모음6 (소프트웨어버젼과 IOS 확인)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-show-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4%EB%B2%84%EC%A0%BC%EA%B3%BC-IOS-%ED%99%95%EC%9D%B8-%EB%AA%A8%EC%9D%8C-6) `2023.5.4`
- [라우터 show 관련 명령어모음5 (플래쉬 내용 확인)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-show-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4%ED%94%8C%EB%9E%98%EC%89%AC-%EB%82%B4%EC%9A%A9-%ED%99%95%EC%9D%B8-%EB%AA%A8%EC%9D%8C-5) `2023.5.3`
- [라우터 show 관련 명령어모음4 (flash 내용 확인)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-show-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4%ED%94%8C%EB%9E%98%EC%89%AC-%EB%82%B4%EC%9A%A9-%ED%99%95%EC%9D%B8-%EB%AA%A8%EC%9D%8C-4) `2023.5.2`
- [라우터 show 관련 명령어모음3 (라우팅테이블 정보 확인)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-show-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4%EB%9D%BC%EC%9A%B0%ED%8C%85%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%A0%95%EB%B3%B4-%ED%99%95%EC%9D%B8-%EB%AA%A8%EC%9D%8C-3) `2023.5.1`
- [라우터 show 관련 명령어모음2 (접속한 사용자 정보)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-show-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EB%B3%B4-%EB%AA%A8%EC%9D%8C-2) `2023.4.30`
- [라우터 show 관련 명령어모음1 (interface)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-show-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-1) `2023.4.29`

### interface 설정 (10편)

- [네트워크 관리사 라우터 설정 - interface의 k (헷갈림주의)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%84%A4%EC%A0%95-interface-%EC%86%8D%EB%8F%84%EC%84%A4%EC%A0%95-%EB%82%9A%EC%9E%84-%EC%A3%BC%EC%9D%98) `2024.4.28`
- [[문제합성+난이도상향] 네트워크 관리사 2급 실기 [라우터 - 인터페이스 및 정적 라우팅 설정]](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%ED%95%A9%EC%84%B1%EB%82%9C%EC%9D%B4%EB%8F%84%EC%83%81%ED%96%A5-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-%EB%B0%8F-%EC%A0%95%EC%A0%81-%EB%9D%BC%EC%9A%B0%ED%8C%85-%EC%84%A4%EC%A0%95) `2023.12.25`
- [[비교하기] 실제 장비와 에뮬레이터의 차이점 [interface 명령어 - secondary]](https://tech-network.tistory.com/entry/%EC%8B%A4%EC%A0%9C-%EC%9E%A5%EB%B9%84%EC%99%80-%EC%97%90%EB%AE%AC%EB%A0%88%EC%9D%B4%ED%84%B0%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90-interface-%EB%AA%85%EB%A0%B9%EC%96%B4-secondary) `2023.6.19`
- [라우터 interface 관련 명령어 모음6 (frame relay)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-interface-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-6) `2023.6.7`
- [라우터 interface 관련 명령어 모음5 (IP 주소 입력 및 secondary)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-interface-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-5) `2023.6.6`
- [라우터 interface 관련 명령어 모음4 (description)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-interface-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-4) `2023.6.5`
- [라우터 interface 관련 명령어 모음3 (clock rate)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-interface-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-3) `2023.6.4`
- [라우터 interface 관련 명령어 모음2 (bandwidth) - 기본값이 k이다](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-interface-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-2) `2023.6.3`
- [라우터 interface 관련 명령어 모음1 (활성화)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-interface-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-1) `2023.6.2`
- [라우터 인터페이스에 속도 설정하기](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EC%97%90-%EC%86%8D%EB%8F%84-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0) `2023.4.6`

### 전역설정모드 (hostname · gateway · domain-name · DHCP) (8편)

- [라우터 DHCP 설정 (03)](https://tech-network.tistory.com/entry/%EB%9D%BC%EC%9A%B0%ED%84%B0-DHCP-%EC%84%A4%EC%A0%95-02) `2024.3.30`
- [라우터 DHCP 설정 (02)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-DHCP-%EC%84%A4%EC%A0%95) `2023.8.3`
- [라우터 전역설정모드 관련 명령어모음 05 (DHCP)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%A0%84%EC%97%AD%EC%84%A4%EC%A0%95%EB%AA%A8%EB%93%9C-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-5) `2023.5.27`
- [라우터 전역설정모드 관련 명령어 모음4 (domain-name)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%A0%84%EC%97%AD%EC%84%A4%EC%A0%95%EB%AA%A8%EB%93%9C-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-4) `2023.5.26`
- [라우터 전역설정모드 관련 명령어 모음3 (default-network)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%A0%84%EC%97%AD%EC%84%A4%EC%A0%95%EB%AA%A8%EB%93%9C-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-3) `2023.5.25`
- [라우터 전역설정모드 관련 명령어 모음2 (hostname)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%A0%84%EC%97%AD%EC%84%A4%EC%A0%95%EB%AA%A8%EB%93%9C-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-2) `2023.5.24`
- [라우터 전역설정모드 관련 명령어 모음1 (기본게이트웨이)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EA%B8%B0%EB%B3%B8%EC%84%A4%EC%A0%95-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-1) `2023.5.23`
- [라우터(게이트웨이 설정)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0%ED%92%80%EC%9D%B4%EA%B2%8C%EC%9D%B4%ED%8A%B8%EC%9B%A8%EC%9D%B4-%EC%84%A4%EC%A0%95) `2023.2.20`

### 접속 · 계정 · 보안 (telnet · ssh · console · SNMP · access-list) (12편)

- [[논란종결] 네트워크 관리사 2급 실기[라우터] console 설정 login ???](https://tech-network.tistory.com/entry/%EB%85%BC%EB%9E%80%EC%A2%85%EA%B2%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0%EB%9D%BC%EC%9A%B0%ED%84%B0-console-%EC%84%A4%EC%A0%95-login) `2024.6.25`
- [네트워크 관리사 2급실기 [라우터] - access list 설정](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-Router-acess-list-%EC%84%A4%EC%A0%95) `2023.11.21`
- [라우터 접속 관련 명령어(ssh 설정-수정)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%A0%91%EC%86%8D-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4ssh-%EC%84%A4%EC%A0%95-%EC%88%98%EC%A0%95) `2023.8.21`
- [라우터 telnet password 설정 (02)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-telnet-password-%EC%84%A4%EC%A0%95) `2023.8.18`
- [라우터 SNMP 설정 (01)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-SNMP-%EC%84%A4%EC%A0%95-01) `2023.8.17`
- [라우터 접속 계정 설정 (01)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%A0%91%EC%86%8D-%EA%B3%84%EC%A0%95-%EC%84%A4%EC%A0%95) `2023.7.26`
- [라우터 접속 관련 명령어 모음4 (ssh)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%A0%91%EC%86%8D-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-4) `2023.6.11`
- [라우터 접속 관련 명령어 모음3 - console](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%A0%91%EC%86%8D-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-3) `2023.6.10`
- [라우터 접속 관련 명령어 모음2 (특정 시간경과시 자동세션끊기)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%A0%91%EC%86%8D-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-2) `2023.6.9`
- [라우터 접속 관련 명령어 모음 01 (telnet)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%A0%91%EC%86%8D-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C-1) `2023.6.8`
- [라우터 console password 설정](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EB%9D%BC%EC%9A%B0%ED%84%B0-console-password-%EC%84%A4%EC%A0%95) `2023.3.29`
- [라우터 - ssh 설정](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0%EB%9D%BC%EC%9A%B0%ED%84%B0-ssh-%EC%84%A4%EC%A0%95) `2023.3.17`

### 라우팅 프로토콜 (RIP · OSPF · 정적 라우팅) (7편)

- [Router (RIP 설정) - 실제 라우터로 풀이](https://tech-network.tistory.com/entry/Router-RIP-%EC%84%A4%EC%A0%95-%EC%8B%A4%EC%A0%9C-%EB%9D%BC%EC%9A%B0%ED%84%B0%EB%A1%9C-%ED%92%80%EC%9D%B4) `2026.4.24`
- [네트워크 관리사 2급실기 (정적 라우팅 2번째)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EC%A0%95%EC%A0%81-%EB%9D%BC%EC%9A%B0%ED%8C%85-2%EB%B2%88%EC%A7%B8) `2024.12.13`
- [네트워크 관리사 - 라우터 RIP 설정 (02)](https://tech-network.tistory.com/entry/%EB%9D%BC%EC%9A%B0%ED%84%B0-RIP-%EC%84%A4%EC%A0%95-02) `2024.8.30`
- [라우터 RIP 설정 (01)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-RIP-%EC%84%A4%EC%A0%95-01) `2023.8.15`
- [라우터 OSFP 설정(01)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-OSFP-%EC%84%A4%EC%A0%95-%ED%92%80%EC%9D%B4) `2023.7.27`
- [Router (OSPF 설정) 심화과정 풀이](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-Router-OSPF-%EC%84%A4%EC%A0%95-%EC%8B%AC%ED%99%94%EA%B3%BC%EC%A0%95-%ED%92%80%EC%9D%B4) `2022.12.5`
- [Router (RIP 설정) 심화과정 풀이](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-Router-RIP-%EC%84%A4%EC%A0%95-%EC%8B%AC%ED%99%94%EA%B3%BC%EC%A0%95-%ED%92%80%EC%9D%B4) `2022.12.5`

### 복합 문제 · 실전 풀이 (4편)

- [[실전대비] 네트워크 관리사 2급 실기 라우터 문제 복합 문제풀이](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-%EC%84%A4%EC%A0%95-%ED%95%A9%EC%84%B1%EB%AC%B8%EC%A0%9C) `2023.9.4`
- [[비교하기] 실제 라우터 및 스위치 VS 에뮬레이터 (gateway 설정하기)](https://tech-network.tistory.com/entry/%EC%8B%A4%EC%A0%9C-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EB%B0%8F-%EC%8A%A4%EC%9C%84%EC%B9%98%EC%97%90-gateway-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0) `2023.6.12`
- [[요령 익히기] 라우터 설정 실수했다면 수정하면 됩니다.](https://tech-network.tistory.com/entry/%EA%BF%80%ED%8C%81-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%84%A4%EC%A0%95-%EC%9E%98%EB%AA%BB-%ED%95%A0%EC%88%98%EB%8F%84-%EC%9E%88%EC%A7%80%EB%A7%8C-%EC%88%98%EC%A0%95%ED%95%98%EB%A9%B4-%EB%90%A9%EB%8B%88%EB%8B%A4) `2023.4.7`
- [라우터문제 유형 총정리(기출문제)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0%EB%AC%B8%EC%A0%9C-%EC%9C%A0%ED%98%95-%EC%B4%9D%EC%A0%95%EB%A6%AC%EA%B8%B0%EC%B6%9C%EB%AC%B8%EC%A0%9C) `2022.11.1`

---

## 5. 서브넷 마스크 · IP address (직접 보기 — 일부는 문제은행 수록)

실기 마지막 '네트워크 설정' 문항과 IP 계산 단답형의 근거가 되는 글들. 암기가 아니라 `256 - 서브넷마스크 = 블록 크기` 로 이해해 두면 모든 유형이 같은 방식으로 풀린다.

### 네트워크 설정 문제 (실기 IP 입력형) (17편)

- [[문제복원] 네트워크 관리사 2급(실기) - 네트워크 설정 (실전형 1편)- VLSM](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95-%EC%8B%A4%EC%A0%84%ED%98%95-1%ED%8E%B8) `2025.8.12`
- [네트워크 관리사 2급 실기 - 네트워크 설정 12편(29비트)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95-12%ED%8E%B829%EB%B9%84%ED%8A%B8) `2024.3.17`
- [네트워크 관리사 2급 실기 - 네트워크 설정 11편(28비트)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95-11%ED%8E%B828%EB%B9%84%ED%8A%B8) `2024.3.15`
- [네트워크 관리사 2급 실기 - 네트워크 설정 10편](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95-10%ED%8E%B8) `2024.1.19`
- [네트워크 관리사 2급 실기 - 네트워크 설정 9편](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95-9%ED%8E%B8) `2023.9.20`
- [네트워크 관리사 2급 실기 - 네트워크 설정 8편](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95-8%ED%8E%B8) `2023.8.20`
- [네트워크 관리사 2급 실기- 네트워크 설정하기(2진수변환-수기풀이)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%A3%BC%EC%86%8C-%EA%B5%AC%ED%95%98%EA%B8%B0-2%EC%A7%84%EC%88%98%EB%B3%80%ED%99%98) `2023.7.21`
- [네트워크 관리사 2급 실기 - 네트워크 설정 07](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%956) `2023.4.11`
- [네트워크 관리사 2급 실기 - 네트워크 설정5](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%956) `2023.4.9`
- [네트워크 관리사 실기 - 실전 네트워크 설정 (스스로 해봐야 합니다)](https://tech-network.tistory.com/entry/%EC%8B%A4%EC%A0%84-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95-%EC%8A%A4%EC%8A%A4%EB%A1%9C-%ED%95%B4%EB%B4%90%EC%95%BC-%ED%95%A9%EB%8B%88%EB%8B%A4) `2023.3.16`
- [네트워크 관리사 2급 실기 - 네트워크 설정문제 (28비트)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C-28%EB%B9%84%ED%8A%B8) `2023.2.25`
- [네트워크 관리사 2급 실기 - 네트워크 설정문제 (24비트)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95%EB%AC%B8%EC%A0%9C) `2023.2.25`
- [네트워크 관리사 2급 실기 - 네트워크 설정 04 (28비트)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%904-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EA%B8%B0%EC%B6%9C%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0) `2023.2.8`
- [네트워크 관리사 2급 실기 - 네트워크 설정 29비트](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-%EC%8B%A4%EA%B8%B0-%EA%B8%B0%EC%B6%9C%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0) `2023.2.3`
- [네트워크 관리사 2급 실기 - 네트워크 설정 24비트](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95) `2023.1.16`
- [네트워크 관리사 2급실기 - 네트워크 설정-2](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95-2) `2022.11.16`
- [네트워크 관리사 2급실기 - 네트워크 설정 01 (28비트)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%A4%EC%A0%95-1) `2022.11.13`

### 서브넷팅 이론 · 실전 연습 (24편)

- [왜 서브넷팅을 이해해야 할까요? (절대로 암기강요 금지)](https://tech-network.tistory.com/entry/%EC%99%9C-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85%EC%9D%84-%EC%9D%B4%ED%95%B4%ED%95%B4%EC%95%BC-%ED%95%A0%EA%B9%8C%EC%9A%94-%EC%A0%88%EB%8C%80%EB%A1%9C-%EC%95%94%EA%B8%B0%EA%B0%95%EC%9A%94-%EA%B8%88%EC%A7%80) `2025.6.20`
- [네트워크 관리사 2급 [필기] 서브넷팅 및 IP address 풀이 (12)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-12) `2025.2.21`
- [네트워크 관리사 2급 [필기] 서브넷팅 및 IP address 풀이 (11)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-11) `2025.2.18`
- [네트워크 관리사 2급 [필기] 서브넷팅 및 IP address 풀이 (10)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-10-ICQA-2021-8-29) `2025.2.14`
- [네트워크 관리사 2급 [필기] 서브넷팅 및 IP address 풀이 (09) #ICQA #2024. 2. 25 #2024. 5. 19](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-09-ICQA-2024-2-25-2024-5-19) `2024.11.2`
- [네트워크 관리사 2급 [필기] 서브넷팅 및 IP address 풀이 (08) #ICQA #2021. 08.29](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-08-ICQA-2021-0829) `2024.2.25`
- [네트워크 관리사 2급 [필기] 서브넷팅 및 IP address 풀이 (07) #ICQA #2022. 02.27](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-07-ICQA-2022-0227) `2024.2.24`
- [네트워크 관리사 2급 [필기] 서브넷팅 및 IP address 풀이 (06) #ICQA #2022. 08.21](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-06-ICQA-2022-0821) `2024.2.23`
- [네트워크 관리사 2급 [필기] 서브넷팅 및 IP address 풀이 (05) #ICQA #2022. 11.06](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-05-ICQA-2022-1106) `2024.2.22`
- [네트워크 관리사 2급 [필기] 서브넷팅 및 IP address 풀이 (04) #ICQA #2023. 02.26](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-04-ICQA-2023-0226) `2024.2.20`
- [네트워크 관리사 2급 필기 (서브넷팅 및 IP address 풀이) -3편](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-3%ED%8E%B8) `2024.2.13`
- [[심화] 실전 서브넷팅 VLSM (2편) 해보기 (실제로 많이 쓰니까 스스로 해야합니다) -  26비트](https://tech-network.tistory.com/entry/%EC%8B%A4%EC%A0%84-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-2%ED%8E%B8-%ED%95%B4%EB%B3%B4%EA%B8%B0-%EC%8B%A4%EC%A0%9C%EB%A1%9C-%EB%A7%8E%EC%9D%B4-%EC%93%B0%EB%8B%88%EA%B9%8C-%EA%BC%AD-%EB%B4%90%EB%91%90%EC%84%B8%EC%9A%94) `2024.2.9`
- [실전 서브넷팅 (3편) 해보기 (실제로 많이 쓰니까 스스로 해야합니다.) -  실무형](https://tech-network.tistory.com/entry/%EC%8B%A4%EC%A0%84-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-3%ED%8E%B8-%ED%95%B4%EB%B3%B4%EA%B8%B0-%EC%8B%A4%EC%A0%9C%EB%A1%9C-%EB%A7%8E%EC%9D%B4-%EC%93%B0%EB%8B%88%EA%B9%8C-%EA%BC%AD-%EB%B4%90%EB%91%90%EC%84%B8%EC%9A%94-%EC%8B%A4%EB%AC%B4%ED%98%95) `2024.2.2`
- [네트워크 관리사 2급 필기 (서브넷팅 및 IP address 풀이) -2편](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-2%ED%8E%B8) `2024.1.25`
- [네트워크 관리사 2급 필기 (서브넷팅 및 IP address 풀이) -1편](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%ED%95%84%EA%B8%B0-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EB%B0%8F-IP-address-%ED%92%80%EC%9D%B4-1%ED%8E%B8) `2024.1.21`
- [[구독자요청] 2진수와 10진수 상호변환](https://tech-network.tistory.com/entry/%EA%B5%AC%EB%8F%85%EC%9E%90%EC%9A%94%EC%B2%AD-2%EC%A7%84%EC%88%98%EC%99%80-10%EC%A7%84%EC%88%98-%EC%83%81%ED%98%B8%EB%B3%80%ED%99%98) `2024.1.3`
- [실전 서브넷팅 (2편) 해보기 (실제로 많이 쓰니까 스스로 해야합니다.) - 25비트+26비트](https://tech-network.tistory.com/entry/%EC%8B%A4%EC%A0%84-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-2%ED%8E%B8-%ED%95%B4%EB%B3%B4%EA%B8%B0-%EC%8B%A4%EC%A0%9C%EB%A1%9C-%EB%A7%8E%EC%9D%B4-%EC%93%B0%EB%8B%88%EA%B9%8C-%EC%8A%A4%EC%8A%A4%EB%A1%9C-%ED%95%B4%EC%95%BC%ED%95%A9%EB%8B%88%EB%8B%A4-25%EB%B9%84%ED%8A%B826%EB%B9%84%ED%8A%B8) `2023.6.1`
- [네트워크관리사 2급실기문제 서브넷마스크 (엑셀계산-2)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0%EB%AC%B8%EC%A0%9C-%EC%84%9C%EB%B8%8C%EB%84%B7%EB%A7%88%EC%8A%A4%ED%81%AC-%EC%97%91%EC%85%80%EA%B3%84%EC%82%B0-2) `2023.4.15`
- [[심화1] 네트워크 관리사 2급 실기 (실전 VLMS) 1편](https://tech-network.tistory.com/entry/%EC%8B%AC%ED%99%943-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%8B%A4%EC%A0%84-VLMS) `2023.3.17`
- [네트워크 관리사 2급 실기 - 2진수를 10진수로 변환하기 (시험때는 수기로 풀어야 합니다)](https://tech-network.tistory.com/entry/2%EC%A7%84%EC%88%98%EB%A5%BC-10%EC%A7%84%EC%88%98%EB%A1%9C-%EB%B3%80%ED%99%98%ED%95%98%EA%B8%B0-%EC%8B%9C%ED%97%98%EB%95%8C%EB%8A%94-%EC%88%98%EA%B8%B0%EB%A1%9C-%ED%92%80%EC%96%B4%EC%95%BC-%ED%95%A9%EB%8B%88%EB%8B%A4) `2023.3.4`
- [서브넷 마스크, 2진수를 10진수로의 변환 등 자동계산 사이트 소개](https://tech-network.tistory.com/entry/2%EC%A7%84%EC%88%98%EB%A5%BC-10%EC%A7%84%EC%88%98%EB%A1%9C-%EC%84%9C%EB%B8%8C%EB%84%B7-%EB%A7%88%EC%8A%A4%ED%81%AC-%EB%93%B1-%EC%9E%90%EB%8F%99%EA%B3%84%EC%82%B0-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%86%8C%EA%B0%9C) `2023.3.4`
- [네트워크 관리사 2급 실기 합성문제 예상 (2진수, 서브넷마스크, 네트워크 ID, 가용 IP 계산 등)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%ED%95%A9%EC%84%B1%EB%AC%B8%EC%A0%9C-%EC%98%88%EC%83%81-2%EC%A7%84%EC%88%98-%EC%84%9C%EB%B8%8C%EB%84%B7%EB%A7%88%EC%8A%A4%ED%81%AC-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-ID-%EA%B0%80%EC%9A%A9-IP-%EA%B3%84%EC%82%B0-%EB%93%B1) `2023.1.20`
- [실전 서브넷팅 (1편) 해보기 (실제로 많이 쓰니까 스스로 해야합니다.) - 25비트](https://tech-network.tistory.com/entry/%EC%8B%A4%EC%A0%84-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-1%ED%8E%B8-%ED%95%B4%EB%B3%B4%EA%B8%B0-%EC%8B%A4%EC%A0%9C%EB%A1%9C-%EB%A7%8E%EC%9D%B4-%EC%93%B0%EB%8B%88%EA%B9%8C-%EA%BC%AD-%EB%B4%90%EB%91%90%EC%84%B8%EC%9A%94) `2022.11.26`
- [네트워크관리사 2급실기문제 서브넷마스크 (엑셀계산)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89%EC%8B%A4%EA%B8%B0%EB%AC%B8%EC%A0%9C-%EC%84%9C%EB%B8%8C%EB%84%B7%EB%A7%88%EC%8A%A4%ED%81%AC-%EC%97%91%EC%85%80%EA%B3%84%EC%82%B0) `2022.11.1`

### 네트워크 ID · 브로드캐스트 · 가용 IP 계산 (7편)

- [네트워크 관리사 2급 실기 - 가용 IP 2번째(실제로 할당 가능한 IP주소) 주소 계산하기](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EA%B0%80%EC%9A%A9-IP-2%EB%B2%88%EC%A7%B8%EC%8B%A4%EC%A0%9C%EB%A1%9C-%ED%95%A0%EB%8B%B9-%EA%B0%80%EB%8A%A5%ED%95%9C-IP%EC%A3%BC%EC%86%8C-%EC%A3%BC%EC%86%8C-%EA%B3%84%EC%82%B0%ED%95%98%EA%B8%B0) `2024.2.11`
- [네트워크 주소 구하기(04)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%A3%BC%EC%86%8C-%EA%B5%AC%ED%95%98%EA%B8%B04) `2023.6.17`
- [네트워크 관리사 2급 실기 - 네트워크 ID 구하기 (5문제 풀이)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-ID-%EA%B5%AC%ED%95%98%EA%B8%B0-5%EA%B0%9C-%ED%92%80%EC%9D%B4) `2023.4.15`
- [네트워크 관리사 2급 실기 - 가용 IP 1번째(실제로 할당 가능한 IP주소) 주소 계산하기](https://tech-network.tistory.com/entry/%EA%B0%80%EC%9A%A9-IP%EC%8B%A4%EC%A0%9C%EB%A1%9C-%ED%95%A0%EB%8B%B9-%EA%B0%80%EB%8A%A5%ED%95%9C-IP%EC%A3%BC%EC%86%8C-%EC%A3%BC%EC%86%8C-%EA%B3%84%EC%82%B0%ED%95%98%EA%B8%B0) `2023.3.4`
- [네트워크 관리사 2급 실기 - 할당 불가능한 IP 3종 세트(네트워크ID, 게이트웨이, 브로드캐스트)](https://tech-network.tistory.com/entry/%ED%95%A0%EB%8B%B9-%EB%B6%88%EA%B0%80%EB%8A%A5%ED%95%9C-IP-3%EC%A2%85-%EC%84%B8%ED%8A%B8%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%ACID-%EA%B2%8C%EC%9D%B4%ED%8A%B8%EC%9B%A8%EC%9D%B4-%EB%B8%8C%EB%A1%9C%EB%93%9C%EC%BA%90%EC%8A%A4%ED%8A%B8) `2023.1.19`
- [네트워크관리사2급 실기 단답형문제 - 네트워크 ID구하기(2)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95%EB%AC%B8%EC%A0%9C-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-ID%EA%B5%AC%ED%95%98%EA%B8%B03) `2022.11.13`
- [네트워크관리사2급 실기 단답형문제 - 네트워크 ID구하기(1)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%8B%A8%EB%8B%B5%ED%98%95%EB%AC%B8%EC%A0%9C-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-ID%EA%B5%AC%ED%95%98%EA%B8%B0) `2022.11.7`

### 기타 (3편)

- [[구독자 요청] 급헷갈리네요...이 문제 도와주세요 ㅎㅎ](https://tech-network.tistory.com/entry/%EA%B5%AC%EB%8F%85%EC%9E%90-%EC%9A%94%EC%B2%AD-%EA%B8%89%ED%97%B7%EA%B0%88%EB%A6%AC%EB%84%A4%EC%9A%94%EC%9D%B4-%EB%AC%B8%EC%A0%9C-%EB%8F%84%EC%99%80%EC%A3%BC%EC%84%B8%EC%9A%94-%E3%85%8E%E3%85%8E) `2024.7.14`
- [SBS 게시판에 드라마 오류(IP관련)로 글 올려봄](https://tech-network.tistory.com/entry/SBS-%EA%B2%8C%EC%8B%9C%ED%8C%90%EC%97%90-%EB%93%9C%EB%9D%BC%EB%A7%88-%EC%98%A4%EB%A5%98IP%EA%B4%80%EB%A0%A8%EB%A1%9C-%EA%B8%80-%EC%98%AC%EB%A0%A4%EB%B4%84) `2023.8.19`
- [네트워크 관리사 2급 네트워크설정  [합성문제] 풀이](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EC%84%A4%EC%A0%95-%ED%95%A9%EC%84%B1%EB%AC%B8%EC%A0%9C-%ED%92%80%EC%9D%B4) `2023.8.16`

---

## 6. 케이블 제작 (직접 보기)

실기 1번 문항. 최근에는 HUB-PC 대신 **공유기 - 각종 기기**(복합기·POS·CCTV·AP 등) 구성이 나오며 대부분 다이렉트 케이블이 정답이다. 실물 제작이므로 링크로만 정리했다.

### 기기별 결선 문제 (다이렉트/크로스 판단) (11편)

- [네트워크관리사 2급 실기 케이블 제작 문제 (POE - CCTV 카메라)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C-POE-CCTV-%EC%B9%B4%EB%A9%94%EB%9D%BC) `2024.6.18`
- [네트워크관리사 2급 실기 케이블 제작 문제 (공유기 - 네트워크 프린터)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C-%EA%B3%B5%EC%9C%A0%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%ED%94%84%EB%A6%B0%ED%84%B0) `2024.2.4`
- [네트워크관리사 2급 실기 케이블 제작 문제 (POE - AP)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C-POE-AP) `2023.9.15`
- [네트워크관리사 2급 실기 케이블 제작 문제 (공유기 - IC카드 단말기)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C-%EA%B3%B5%EC%9C%A0%EA%B8%B0-IC%EC%B9%B4%EB%93%9C-%EB%8B%A8%EB%A7%90%EA%B8%B0) `2023.9.5`
- [네트워크관리사 2급 실기 케이블 제작 문제 (공유기 - 스마트TV)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C-%EA%B3%B5%EC%9C%A0%EA%B8%B0-%EC%8A%A4%EB%A7%88%ED%8A%B8TV) `2023.7.25`
- [네트워크관리사 2급 실기 케이블 제작 문제 (공유기 - 지문인식기)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C-%EA%B3%B5%EC%9C%A0%EA%B8%B0-%EC%A7%80%EB%AC%B8%EC%9D%B8%EC%8B%9D%EA%B8%B0) `2023.7.15`
- [네트워크관리사 2급 실기 케이블 제작 문제 (공유기 - 식권발매기)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C-%EA%B3%B5%EC%9C%A0%EA%B8%B0-%EC%8B%9D%EA%B6%8C%EB%B0%9C%EB%A7%A4%EA%B8%B0) `2023.6.20`
- [네트워크관리사 2급 실기 케이블 제작 문제 (중간에 커플러?)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C-%EC%A4%91%EA%B0%84%EC%97%90-%EC%BB%A4%ED%94%8C%EB%9F%AC) `2023.4.18`
- [네트워크관리사 2급 실기 케이블 제작 문제 (공유기 - 셋톱박스)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EC%83%88%EB%A1%9C%EC%9A%B4-%EC%9C%A0%ED%98%95%EC%9D%98-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C-%EA%B3%B5%EC%9C%A0%EA%B8%B0-%EC%85%8B%ED%86%B1%EB%B0%95%EC%8A%A4) `2023.4.9`
- [네트워크관리사 2급 실기 케이블 제작 문제 (공유기 - POS)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EC%83%88%EB%A1%9C%EC%9A%B4-%EC%9C%A0%ED%98%95%EC%9D%98-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C-%EA%B3%B5%EC%9C%A0%EA%B8%B0-POS) `2023.4.2`
- [네트워크관리사 2급 실기 케이블 제작 문제 (공유기 - 복합기)](https://tech-network.tistory.com/entry/%EB%AC%B8%EC%A0%9C%EB%B3%B5%EC%9B%90-%EC%83%88%EB%A1%9C%EC%9A%B4-%EC%9C%A0%ED%98%95%EC%9D%98-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91-%EB%AC%B8%EC%A0%9C) `2023.3.12`

### RJ-45 · 제작 요령 · 채점 기준 (5편)

- [네트워크 관리사 2급 실기 1번 케이블 정답 관련 각종 기기 모음](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-1%EB%B2%88-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%95%EB%8B%B5-%EA%B4%80%EB%A0%A8-%EA%B0%81%EC%A2%85-%EA%B8%B0%EA%B8%B0-%EB%AA%A8%EC%9D%8C) `2026.4.10`
- [네트워크 관리사, PC 정비사 2급 실기 케이블 오답처리 (뒤집기 금지)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-PC-%EC%A0%95%EB%B9%84%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91%EB%AC%B8%EC%A0%9C-%EB%92%A4%EC%A7%91%EA%B8%B0-%EA%B8%88%EC%A7%80) `2023.6.28`
- [네트워크 관리사, PC정비사 UTP 케이블 제작](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-PC%EC%A0%95%EB%B9%84%EC%82%AC-UTP-%EC%BC%80%EC%9D%B4%EB%B8%94-%EC%A0%9C%EC%9E%91) `2023.1.4`
- [RJ 45 jack 빠르고 정확하기 찍기...오직 연습만이 정답이다.](https://tech-network.tistory.com/entry/RJ-45-jack-%EB%B9%A0%EB%A5%B4%EA%B3%A0-%EC%A0%95%ED%99%95%ED%95%98%EA%B8%B0-%EC%B0%8D%EA%B8%B0%EC%98%A4%EC%A7%81-%EC%97%B0%EC%8A%B5%EB%A7%8C%EC%9D%B4-%EC%A0%95%EB%8B%B5%EC%9D%B4%EB%8B%A4) `2022.11.17`
- [[케이블 관련] RJ 45 jack 설명](https://tech-network.tistory.com/entry/RJ-45-jack-%EC%84%A4%EB%AA%85) `2022.11.1`

---

## 7. 회차 복원 · 모의고사 (직접 보기)

특정 시행 회차의 전체 복원·가답안. 시험 직전 최종 점검용.

### 회차 복원 · 전체 풀이 (2편)

- [네트워크 관리사 2급 실기 모의고사 6회 (전체 풀이)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%AA%A8%EC%9D%98%EA%B3%A0%EC%82%AC-6%ED%9A%8C-%EC%A0%84%EC%B2%B4-%ED%92%80%EC%9D%B4) `2025.9.4`
- [네트워크 관리사 2급 실기 문제 복원 및 가답안 (2025.06.22.)](https://tech-network.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%82%AC-2%EA%B8%89-%EC%8B%A4%EA%B8%B0-%EB%AC%B8%EC%A0%9C-%EB%B3%B5%EC%9B%90-%EB%B0%8F-%EA%B0%80%EC%B1%84%EC%A0%90-20250622) `2025.6.22`
