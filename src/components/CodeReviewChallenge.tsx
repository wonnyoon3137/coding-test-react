import { useEffect, useState } from 'react';
import styles from './CodeReviewChallenge.module.css';

/**
 * ## 과제 5: 코드 리뷰
 *
 * 아래 `UserList`는 사용자 목록을 렌더링합니다. 정상 동작하지만 개선 여지가 있습니다.
 *
 * ### 요구사항:
 * 1. 코드(JSX 포함)를 읽고 잠재적인 문제점이나 개선점을 찾아보세요.
 * 2. 발견한 내용에 대해, 해당 코드 라인 근처에 주석을 사용하여 코드 리뷰를 작성해주세요.
 *    - 무엇이 문제인지, 왜 문제인지, 어떻게 개선할지 제시해주세요.
 * 3. 최소 3가지 이상의 유의미한 코드 리뷰를 작성해야 합니다.
 *
 * ### 선택사항:
 * - 코드 리뷰 작성을 넘어, 실제로 코드를 개선하여 리팩토링을 진행해보세요.
 * - (주의: 이 과제는 코드 리뷰 능력을 중점적으로 보기 때문에, 리뷰 작성 없이 리팩토링만 진행하면 안 됩니다.)
 */

type UserData = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

// 가짜 API 호출 함수
const fetchUsers = (): Promise<UserData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '김철수', email: 'chulsoo@example.com', isAdmin: false },
        { id: 2, name: '이영희', email: 'younghee@example.com', isAdmin: true },
        { id: 3, name: '스티브', email: 'steve@example.com', isAdmin: false },
        { id: 4, name: '관리자', email: 'admin@example.com', isAdmin: true },
        { id: 5, name: 'Steve Jobs', email: 'sj@apple.com', isAdmin: false },
        { id: 6, name: 'Apple Mint', email: 'mint@gmail.com', isAdmin: false },
      ]);
    }, 500);
  });
};

const UserList = () => {
  //타입은 UserData[]로 명시하는게 좋을것같습니다.
  const [users, setUsers] = useState<UserData[]>([]); // state 1
  //filter라는 이름보다 inputValue가 조금 더 직관적인 state명인것같습니다.
  const [filter, setFilter] = useState(''); // state 2
  const [loading, setLoading] = useState(true); // state 3
  const [showAdminsOnly, setShowAdminsOnly] = useState(false); // state 4

  // 데이터 로딩
  useEffect(() => {
    //isError 상태를 만들고, try-catch 구문 안에서 함수를 호출하여 에러핸들링을 할 수 있습니다.
    // ![추가] fetchUsers 실패 시를 대비한 error state가 없어, 네트워크 에러 발생 시 사용자에게 적절한 피드백을 주기 어렵습니다.
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // 필터링 로직
  // ![추가] useMemo로 감싸서 불필요한 재계산 방지 필요
  // ![추가] 검색어가 빈 문자열일때 early return 가능
  // ![추가] filter로 문자열 검색 시 대소문자 처리 누락
  const filteredUsers = users.filter((user) => {
    const nameMatches = user.name.includes(filter);
    const emailMatches = user.email.includes(filter);
    // 관리자만 보기는 매번 연산을 하는 것보다 조건부렌더링으로 숨김처리하는게 더 좋을것같습니다.
    const adminMatches = !showAdminsOnly || user.isAdmin;
    return (nameMatches || emailMatches) && adminMatches;
  });

  return (
    <div className={styles.container}>
      <h2>과제 5: 코드 리뷰하기</h2>
      <p className={styles.description}>
        이 파일(`CodeReviewChallenge.tsx`)의 코드에 대한 리뷰를 주석으로 작성해주세요.
      </p>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="이름으로 검색..."
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
        />
        <label>
          <input type="checkbox" checked={showAdminsOnly} onChange={(e) => setShowAdminsOnly(e.target.checked)} />
          관리자만 보기
        </label>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>역할</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                {/* 역할(Role) 표시 */}
                <td style={{ color: u.isAdmin ? 'blue' : 'black' }}>{u.isAdmin ? 'Admin' : 'User'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
