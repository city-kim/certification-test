export interface RouterGuideItem {
  id: string;
  title: string;
  question: string;
  commands: string[];
  explanation: string;
  caution?: string;
}

export interface RouterGuideSection {
  key: string;
  label: string;
  items: RouterGuideItem[];
}

export const ROUTER_GUIDE_SOURCE =
  "https://tech-network.tistory.com/category/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%20%EA%B4%80%EB%A6%AC%EC%82%AC%202%EA%B8%89%20%28%ED%95%84%EA%B8%B0%2C%EC%8B%A4%EA%B8%B0%29/Router%20%EC%84%A4%EC%A0%95?page=1";

export const ROUTER_COMMON_FLOW = [
  "Router> en",
  "Router# conf t",
  "Router(config)# [문제에서 요구한 설정]",
  "Router(config)# exit",
  "Router# copy run start",
];

/** 카테고리 1~9페이지의 복원 문제 중 반복 출제되는 명령 유형을 통합했다. */
export const ROUTER_GUIDE_SECTIONS: RouterGuideSection[] = [
  {
    key: "show",
    label: "show 확인 명령",
    items: [
      {
        id: "show-interface",
        title: "전체 인터페이스",
        question: "라우터의 모든 인터페이스 상태와 정보를 출력하시오.",
        commands: ["Router# show interfaces"],
        explanation: "각 인터페이스의 상태와 상세 통계를 한 번에 출력한다. 시험에서는 show interface 또는 축약형 sh int도 사용한다.",
      },
      {
        id: "show-users",
        title: "접속 사용자",
        question: "현재 라우터에 접속한 사용자 정보를 확인하시오.",
        commands: ["Router# show users"],
        explanation: "현재 접속 중인 사용자와 접속 회선을 확인한다. sh user로 줄여 입력할 수 있다.",
      },
      {
        id: "show-route",
        title: "라우팅 테이블",
        question: "라우터의 Routing Table을 확인하시오.",
        commands: ["Router# show ip route"],
        explanation: "직접 연결, 정적 경로, RIP·OSPF 등으로 학습된 목적지 경로를 출력한다.",
      },
      {
        id: "show-flash",
        title: "Flash 내용",
        question: "라우터의 Flash 메모리 내용을 확인하시오.",
        commands: ["Router# show flash"],
        explanation: "IOS 이미지 등이 저장된 Flash 메모리의 파일과 사용량을 확인한다.",
      },
      {
        id: "show-processes",
        title: "CPU 프로세스",
        question: "CPU의 프로세스 상태와 사용률을 확인하시오.",
        commands: ["Router# show processes cpu"],
        explanation: "실행 중인 프로세스별 CPU 사용 정보를 출력한다. processes의 s를 빠뜨리지 않는다.",
      },
      {
        id: "show-version",
        title: "버전·IOS",
        question: "라우터의 소프트웨어 버전과 IOS 정보를 확인하시오.",
        commands: ["Router# show version"],
        explanation: "IOS 버전, 장비 모델, 메모리와 부팅 관련 정보를 확인한다. 축약형은 sh ver이다.",
      },
      {
        id: "show-hosts",
        title: "Host 정보",
        question: "라우터에 등록된 host 정보를 확인하시오.",
        commands: ["Router# show hosts"],
        explanation: "이름과 주소의 매핑 및 이름 해석 관련 정보를 출력한다. 복원 문제에서는 sh host 형태도 사용한다.",
      },
    ],
  },
  {
    key: "interface",
    label: "인터페이스 설정",
    items: [
      {
        id: "interface-enable",
        title: "인터페이스 활성화",
        question: "FastEthernet 0/0 인터페이스를 활성화하시오.",
        commands: [
          "Router(config)# interface fastethernet 0/0",
          "Router(config-if)# no shutdown",
        ],
        explanation: "인터페이스 설정 모드로 들어가 shutdown 상태를 해제한다. int fa 0/0처럼 축약할 수 있다.",
        caution: "인터페이스 설정 문제에서는 no shutdown 누락을 가장 먼저 확인한다.",
      },
      {
        id: "interface-ip",
        title: "IP·보조 IP",
        question: "Serial 2/0에 192.168.0.101/24와 보조 IP 192.168.0.102/24를 설정하시오.",
        commands: [
          "Router(config)# interface serial 2/0",
          "Router(config-if)# no shutdown",
          "Router(config-if)# ip address 192.168.0.101 255.255.255.0",
          "Router(config-if)# ip address 192.168.0.102 255.255.255.0 secondary",
        ],
        explanation: "기본 IP는 ip address 뒤에 주소와 마스크를 입력한다. 같은 인터페이스에 IP를 추가할 때만 마지막에 secondary를 붙인다.",
        caution: "두 번째 IP에서 secondary를 빼면 기존 기본 IP가 교체될 수 있다.",
      },
      {
        id: "interface-description",
        title: "인터페이스 설명",
        question: "FastEthernet 0/0 인터페이스의 설명을 ICQA로 지정하시오.",
        commands: [
          "Router(config)# interface fastethernet 0/0",
          "Router(config-if)# no shutdown",
          "Router(config-if)# description ICQA",
        ],
        explanation: "description 뒤의 문자열이 해당 포트의 주석으로 저장된다. 문제에 제시된 대소문자를 그대로 입력한다.",
      },
      {
        id: "interface-clock",
        title: "Clock rate",
        question: "Serial 2/0 인터페이스의 클럭 속도를 72K로 설정하시오.",
        commands: [
          "Router(config)# interface serial 2/0",
          "Router(config-if)# no shutdown",
          "Router(config-if)# clock rate 72000",
        ],
        explanation: "clock rate 값은 bps 단위이므로 72K는 72×1000인 72000을 입력한다.",
        caution: "clock rate에는 72가 아니라 72000을 입력한다.",
      },
      {
        id: "interface-bandwidth",
        title: "Bandwidth",
        question: "Serial 2/0 인터페이스의 대역폭을 2048K로 지정하시오.",
        commands: [
          "Router(config)# interface serial 2/0",
          "Router(config-if)# no shutdown",
          "Router(config-if)# bandwidth 2048",
        ],
        explanation: "bandwidth의 기본 단위는 kbps이므로 2048K는 숫자 2048을 그대로 입력한다.",
        caution: "clock rate는 bps, bandwidth는 kbps 기준이라는 차이를 구분한다.",
      },
      {
        id: "interface-frame-relay",
        title: "Frame Relay",
        question: "Serial 2/0 인터페이스의 캡슐화 방식을 Frame Relay로 설정하시오.",
        commands: [
          "Router(config)# interface serial 2/0",
          "Router(config-if)# no shutdown",
          "Router(config-if)# encapsulation frame-relay",
        ],
        explanation: "인터페이스 설정 모드에서 encapsulation 명령으로 데이터링크 캡슐화 방식을 지정한다.",
      },
    ],
  },
  {
    key: "global",
    label: "전역·DHCP 설정",
    items: [
      {
        id: "global-hostname",
        title: "Hostname",
        question: "라우터의 이름을 ICQA로 변경하시오.",
        commands: ["Router(config)# hostname ICQA"],
        explanation: "hostname 뒤에 새 장비 이름을 입력하면 이후 프롬프트가 ICQA(config)#처럼 바뀐다.",
      },
      {
        id: "global-gateway",
        title: "기본 게이트웨이",
        question: "라우터의 기본 게이트웨이를 192.168.0.1로 설정하시오.",
        commands: ["Router(config)# ip default-gateway 192.168.0.1"],
        explanation: "ip default-gateway 뒤에는 게이트웨이 주소만 입력한다.",
        caution: "기본 게이트웨이 뒤에는 서브넷마스크를 붙이지 않는다.",
      },
      {
        id: "global-default-network",
        title: "Default network",
        question: "192.168.10.0 네트워크를 기본 네트워크로 지정하시오.",
        commands: ["Router(config)# ip default-network 192.168.10.0"],
        explanation: "라우팅 프로토콜이 기본 경로 후보로 사용할 네트워크를 지정한다. default-gateway와 명령이 다르다.",
      },
      {
        id: "global-domain",
        title: "Domain name",
        question: "라우터의 도메인 이름을 icqa.or.kr로 설정하시오.",
        commands: ["Router(config)# ip domain-name icqa.or.kr"],
        explanation: "도메인 이름을 지정하는 전역 설정이다. SSH용 RSA 키 생성 전에도 사용한다.",
      },
      {
        id: "global-dhcp",
        title: "DHCP Pool",
        question: "ICQA 이름의 DHCP Pool을 만들고 192.168.110.0/24 대역을 설정하시오.",
        commands: [
          "Router(config)# ip dhcp pool ICQA",
          "Router(dhcp-config)# network 192.168.110.0 255.255.255.0",
        ],
        explanation: "ip dhcp pool로 DHCP 설정 모드에 들어간 뒤 network에 네트워크 ID와 서브넷마스크를 입력한다.",
        caution: "Pool 이름은 문제에 제시된 대소문자를 그대로 사용한다.",
      },
    ],
  },
  {
    key: "access",
    label: "접속·보안 설정",
    items: [
      {
        id: "access-telnet",
        title: "Telnet 비밀번호",
        question: "VTY 0~4에 비밀번호 ICQA를 지정하고 원격 로그인을 허용하시오.",
        commands: [
          "Router(config)# line vty 0 4",
          "Router(config-line)# password ICQA",
          "Router(config-line)# login",
        ],
        explanation: "VTY 0번부터 4번까지 최대 5개 원격 세션에 비밀번호 인증을 적용한다.",
        caution: "line vty 0 4의 0과 4를 띄우고, 비밀번호를 실제로 묻게 하려면 login을 입력한다.",
      },
      {
        id: "access-console",
        title: "Console 비밀번호",
        question: "콘솔 접속 시 비밀번호 ICQA를 입력하도록 설정하시오.",
        commands: [
          "Router(config)# line console 0",
          "Router(config-line)# password ICQA",
          "Router(config-line)# login",
        ],
        explanation: "물리 콘솔 회선의 비밀번호를 지정하고 login으로 암호 확인을 활성화한다.",
      },
      {
        id: "access-timeout",
        title: "자동 세션 종료",
        question: "VTY 접속 후 5분 30초 동안 입력이 없으면 세션을 종료하도록 설정하시오.",
        commands: [
          "Router(config)# line vty 0 4",
          "Router(config-line)# exec-timeout 5 30",
        ],
        explanation: "exec-timeout의 첫 값은 분, 두 번째 값은 초다. 0 0은 자동 종료를 사용하지 않는 설정이다.",
      },
      {
        id: "access-ssh",
        title: "SSH만 허용",
        question: "VTY 0~4에서 SSH 접속만 허용하시오.",
        commands: [
          "Router(config)# line vty 0 4",
          "Router(config-line)# transport input ssh",
          "Router(config-line)# login",
        ],
        explanation: "transport input ssh로 VTY 인바운드 접속 프로토콜을 SSH로 제한한다.",
        caution: "명령어는 transport이다. tranport로 철자를 틀리지 않는다.",
      },
      {
        id: "access-user",
        title: "로컬 계정",
        question: "사용자 ICQA와 비밀문자 cisco를 로컬 계정으로 등록하시오.",
        commands: ["Router(config)# username ICQA secret cisco"],
        explanation: "username과 secret으로 로컬 사용자와 암호화된 비밀문자를 등록한다. 문제에 password가 지정되면 해당 키워드를 따른다.",
      },
      {
        id: "access-snmp",
        title: "SNMP Community",
        question: "읽기 전용 SNMP Community 문자열을 ICQA로 설정하시오.",
        commands: ["Router(config)# snmp-server community ICQA ro"],
        explanation: "community 문자열 뒤의 ro는 읽기 전용 권한이다. rw가 제시되면 읽기·쓰기 권한으로 설정한다.",
      },
      {
        id: "access-acl",
        title: "Access List 적용",
        question: "FastEthernet 0/0에 ACL 1을 들어오고 나가는 방향 모두 적용하시오.",
        commands: [
          "Router(config)# interface fastethernet 0/0",
          "Router(config-if)# ip access-group 1 in",
          "Router(config-if)# ip access-group 1 out",
        ],
        explanation: "정의된 ACL을 인터페이스에 적용한다. in과 out은 라우터 인터페이스를 기준으로 한 패킷 방향이다.",
      },
    ],
  },
  {
    key: "routing",
    label: "라우팅 설정",
    items: [
      {
        id: "routing-static",
        title: "정적 라우팅",
        question: "192.188.20.0/24 목적지를 Next-Hop 176.18.1.2로 보내시오.",
        commands: ["Router(config)# ip route 192.188.20.0 255.255.255.0 176.18.1.2"],
        explanation: "ip route 다음에 목적지 네트워크, 서브넷마스크, Next-Hop 주소 순서로 입력한다.",
      },
      {
        id: "routing-default",
        title: "기본 정적 경로",
        question: "알 수 없는 모든 목적지를 Next-Hop 192.168.0.1로 보내시오.",
        commands: ["Router(config)# ip route 0.0.0.0 0.0.0.0 192.168.0.1"],
        explanation: "목적지와 마스크를 모두 0.0.0.0으로 지정하면 라우팅 테이블에 더 구체적인 경로가 없을 때 사용하는 기본 경로가 된다.",
      },
      {
        id: "routing-rip",
        title: "RIP",
        question: "RIP를 활성화하고 192.168.10.0 네트워크를 광고하시오.",
        commands: [
          "Router(config)# router rip",
          "Router(config-router)# network 192.168.10.0",
        ],
        explanation: "router rip으로 RIP 설정 모드에 들어간 뒤 network에 문제에서 제시된 네트워크를 입력한다.",
      },
      {
        id: "routing-ospf",
        title: "OSPF",
        question: "프로세스 1에서 192.70.100.0/24 네트워크를 Area 1에 포함하시오.",
        commands: [
          "Router(config)# router ospf 1",
          "Router(config-router)# network 192.70.100.0 0.0.0.255 area 1",
        ],
        explanation: "OSPF network에는 네트워크 ID, 와일드카드 마스크, Area 번호를 입력한다. /24의 와일드카드 마스크는 0.0.0.255다.",
        caution: "OSPF에는 서브넷마스크가 아니라 255에서 각 옥텟을 뺀 와일드카드 마스크를 사용한다.",
      },
    ],
  },
];
