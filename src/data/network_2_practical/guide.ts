export interface GuideProtocol {
  name: string;
  transport: string;
  port: string;
  description: string;
}

export interface GuideRow {
  label: string;
  value: string;
}

/** 실기 시험 직전에 훑을 필수 프로토콜. 부가 포트와 참고 항목은 제외한다. */
export const PRACTICAL_PROTOCOLS: GuideProtocol[] = [
  { name: "ARP", transport: "포트 없음", port: "—", description: "IP 주소를 MAC 주소로 변환" },
  { name: "RARP", transport: "포트 없음", port: "—", description: "MAC 주소를 IP 주소로 변환" },
  { name: "ICMP", transport: "IP 번호 1", port: "—", description: "오류 보고와 상태 진단, ping" },
  { name: "IGMP", transport: "IP 번호 2", port: "—", description: "IPv4 멀티캐스트 그룹 가입·탈퇴 관리" },
  { name: "FTP-DATA", transport: "TCP", port: "20", description: "FTP 데이터 전송" },
  { name: "FTP", transport: "TCP", port: "21", description: "FTP 연결과 명령 제어" },
  { name: "SSH", transport: "TCP", port: "22", description: "암호화 원격 접속" },
  { name: "Telnet", transport: "TCP", port: "23", description: "평문 원격 접속" },
  { name: "SMTP", transport: "TCP", port: "25", description: "이메일 발송과 서버 간 전달" },
  { name: "DNS", transport: "TCP·UDP", port: "53", description: "도메인 이름과 IP 주소 변환" },
  { name: "DHCP Server", transport: "UDP", port: "67", description: "IP 설정 자동 할당 — 서버" },
  { name: "DHCP Client", transport: "UDP", port: "68", description: "IP 설정 자동 할당 — 클라이언트" },
  { name: "TFTP", transport: "UDP", port: "69", description: "인증 기능을 줄인 단순 파일 전송" },
  { name: "HTTP", transport: "TCP", port: "80", description: "웹 문서 전송" },
  { name: "POP3", transport: "TCP", port: "110", description: "이메일을 클라이언트로 내려받음" },
  { name: "NTP", transport: "UDP", port: "123", description: "네트워크 시간 동기화" },
  { name: "IMAP", transport: "TCP", port: "143", description: "서버의 이메일 동기화·관리" },
  { name: "SNMP", transport: "UDP", port: "161", description: "네트워크 장비 조회·관리" },
  { name: "SNMP Trap", transport: "UDP", port: "162", description: "장비가 관리자에게 이벤트 통보" },
  { name: "BGP", transport: "TCP", port: "179", description: "서로 다른 AS 사이의 경로 교환" },
  { name: "HTTPS", transport: "TCP", port: "443", description: "TLS로 암호화된 웹 통신" },
  { name: "RIP", transport: "UDP", port: "520", description: "거리 벡터, 홉 수 기준, 최대 15홉" },
  { name: "OSPF", transport: "IP 번호 89", port: "—", description: "링크 상태, 다익스트라 최단 경로" },
];

export const TCP_UDP_ROWS = [
  { label: "연결 방식", tcp: "연결형", udp: "비연결형" },
  { label: "신뢰성", tcp: "보장", udp: "보장하지 않음" },
  { label: "순서 보장", tcp: "보장", udp: "보장하지 않음" },
  { label: "재전송", tcp: "있음", udp: "없음" },
  { label: "속도", tcp: "상대적으로 느림", udp: "빠름" },
  { label: "데이터 단위", tcp: "세그먼트", udp: "데이터그램" },
];

export const OSI_ROWS = [
  { layer: "7", name: "응용", role: "사용자에게 네트워크 서비스 제공", pdu: "데이터", examples: "HTTP, FTP, DNS, SMTP" },
  { layer: "6", name: "표현", role: "형식 변환, 압축, 암호화·복호화", pdu: "데이터", examples: "인코딩, 압축, 암호화" },
  { layer: "5", name: "세션", role: "연결 설정·유지·종료, 동기화", pdu: "데이터", examples: "세션 관리" },
  { layer: "4", name: "전송", role: "종단 간 전송, 포트, 흐름·오류 제어", pdu: "세그먼트·데이터그램", examples: "TCP, UDP, L4 스위치" },
  { layer: "3", name: "네트워크", role: "IP 주소, 라우팅, 최적 경로", pdu: "패킷", examples: "IP, ICMP, 라우터" },
  { layer: "2", name: "데이터링크", role: "MAC 주소, 프레임 전달, 오류 검출", pdu: "프레임", examples: "Ethernet, 스위치, 브리지" },
  { layer: "1", name: "물리", role: "전기·빛·무선 신호 전송", pdu: "비트", examples: "허브, 리피터, 케이블" },
];

export const NETWORK_COMMANDS: GuideRow[] = [
  { label: "ifconfig / ip addr", value: "IP 주소와 네트워크 인터페이스 확인" },
  { label: "route -n / ip route", value: "라우팅 테이블 확인" },
  { label: "netstat -antp / ss -tulnp", value: "연결 상태, 포트와 프로세스 확인" },
  { label: "arp -a / ip neigh", value: "IP와 MAC 주소 대응 관계 확인" },
  { label: "ping 주소", value: "대상과 통신할 수 있는지 확인" },
  { label: "traceroute 주소", value: "목적지까지 거치는 경로 확인" },
  { label: "nslookup / dig", value: "DNS로 도메인 또는 IP 조회" },
  { label: "hostname", value: "호스트 이름 확인·설정" },
];

export const LINUX_COMMAND_GROUPS: Array<{ title: string; rows: GuideRow[] }> = [
  {
    title: "파일·디렉터리",
    rows: [
      { label: "pwd", value: "현재 디렉터리의 절대경로 출력" },
      { label: "ls / ls -al", value: "파일 목록 / 숨김 파일 포함 상세 목록" },
      { label: "cd", value: "디렉터리 이동" },
      { label: "mkdir / rmdir", value: "디렉터리 생성 / 빈 디렉터리 삭제" },
      { label: "touch", value: "빈 파일 생성 또는 시간 정보 변경" },
      { label: "cp / cp -r", value: "파일 / 디렉터리 복사" },
      { label: "mv", value: "파일 이동 또는 이름 변경" },
      { label: "rm / rm -r", value: "파일 / 디렉터리 삭제" },
      { label: "cat / more / less", value: "파일 내용 출력" },
      { label: "head / tail / tail -f", value: "파일 앞·뒤 또는 로그 실시간 확인" },
      { label: "grep / find", value: "문자열 / 파일 검색" },
    ],
  },
  {
    title: "사용자·권한",
    rows: [
      { label: "whoami / id / who", value: "현재 사용자·UID·로그인 사용자 확인" },
      { label: "useradd / userdel", value: "사용자 생성 / 삭제" },
      { label: "passwd", value: "사용자 비밀번호 설정" },
      { label: "groupadd", value: "그룹 생성" },
      { label: "chmod", value: "파일 권한 변경" },
      { label: "chown user:group", value: "소유자와 그룹 변경" },
    ],
  },
  {
    title: "프로세스·시스템",
    rows: [
      { label: "ps -ef / top", value: "전체 프로세스 / 실시간 상태 확인" },
      { label: "kill PID / kill -9 PID", value: "프로세스 종료 / 강제 종료" },
      { label: "df -h / du -sh", value: "파일시스템 남은 공간 / 특정 경로 사용량" },
      { label: "free -h", value: "메모리 사용량 확인" },
      { label: "uname -a", value: "커널과 시스템 정보 확인" },
      { label: "history / man", value: "명령 기록 / 명령 설명서" },
      { label: "systemctl status·start·restart·enable", value: "서비스 상태·시작·재시작·자동 시작" },
    ],
  },
];

export const PERMISSION_ROWS: GuideRow[] = [
  { label: "r / w / x", value: "읽기 4 / 쓰기 2 / 실행 1" },
  { label: "755", value: "rwx r-x r-x" },
  { label: "644", value: "rw- r-- r--" },
];

export const TAR_ROWS: GuideRow[] = [
  { label: "c / x / v / f / z", value: "생성 / 해제 / 과정 표시 / 파일 지정 / gzip" },
  { label: "tar -cvf 파일.tar 대상", value: "tar 묶기" },
  { label: "tar -xvf 파일.tar", value: "tar 풀기" },
  { label: "tar -czvf 파일.tar.gz 대상", value: "gzip으로 압축하며 묶기" },
  { label: "tar -xzvf 파일.tar.gz", value: "gzip 압축 해제" },
];
