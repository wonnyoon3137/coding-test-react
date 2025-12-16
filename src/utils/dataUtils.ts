// --- 데이터 타입 정의 ---
export interface User {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
  department: string;
  tags?: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface Order {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
  orderDate: string;
}

export interface CategorySummary {
  [category: string]: {
    totalPrice: number;
  };
}

export interface DepartmentSummary {
  [department: string]: {
    userCount: number;
    averageAge: number;
  };
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

// 문제 1: 활성 사용자 필터링
export const filterActiveUsers = (users: User[]): User[] => {
  return users.filter((item) => item.isActive);
};

// 문제 2: ID로 사용자 찾기
export const findUserById = (users: User[], id: number): User | undefined => {
  const user = users.find((user) => user.id === id);
  return user;
};

// 문제 3: 사용자 이름을 ID 맵으로 변환
export const createUserMap = (users: User[]): { [id: number]: string } => {
  const result: { [id: number]: string } = {};
  //! forEach를 사용하면 더 간단하게 구현 가능,
  //! map은 배열 변환할때 사용하기 때문에 좋은 방법은 아님
  users.forEach((user) => {
    result[user.id] = user.name;
  });
  return result;
};

// 문제 4: 키를 기준으로 배열 정렬
export const sortArrayByKey = <T>(array: T[], key: keyof T, order: 'asc' | 'desc'): T[] => {
  const sorted = [...array].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    if (valueA === valueB) return 0;
    if (order === 'asc') {
      return valueA > valueB ? 1 : -1;
    }
    return valueA < valueB ? 1 : -1;
  });
  return sorted;
};

// 문제 5: 페이지네이션 구현
export const paginate = <T>(array: T[], page: number, pageSize: number): PaginatedResult<T> => {
  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const items = array.slice(startIndex, startIndex + pageSize);

  return {
    items,
    totalItems,
    totalPages,
    currentPage: page,
  };
};

// 문제 6: 계산된 속성 추가 (age 가 20 이상을 adult 로 간주합니다)
export const addIsAdultProperty = (users: User[]): (User & { isAdult: boolean })[] => {
  const result = users.map((user) => {
    if (user.age >= 20) {
      return { ...user, isAdult: true };
    } else return { ...user, isAdult: false };
  });
  return result;
};

// 문제 7: 카테고리별 상품 총액 계산
export const getCategoryTotals = (products: Product[]): CategorySummary => {
  const result: CategorySummary = {};

  products.forEach((product) => {
    if (!result[product.category]) {
      //! 기존 코드에서는 첫 상품의 price가 더해지지 않았음 ..
      result[product.category] = { totalPrice: product.price };
    } else {
      result[product.category].totalPrice += product.price;
    }
  });

  return result;
};

// 문제 8: 두 사용자 배열 병합 및 중복 제거 (중복이 있는 경우 users2 내의 사용자를 사용합니다)
export const mergeAndDeduplicateUsers = (users1: User[], users2: User[]): User[] => {
  const userMap = new Map<number, User>();

  //! Map의 set메서드 활용
  users1.forEach((user) => {
    userMap.set(user.id, user);
  });

  users2.forEach((user) => {
    userMap.set(user.id, user);
  });

  return Array.from(userMap.values());
};

// 문제 9: 특정 태그를 가진 사용자 찾기
export const findUsersByTag = (users: User[], tag: string): User[] => {
  return users.filter((item) => item.tags?.includes(tag));
};

// 문제 10: 부서별 사용자 통계 집계
export const getDepartmentSummary = (users: User[]): DepartmentSummary => {
  const summary: DepartmentSummary = {};

  users.forEach((user) => {
    if (!summary[user.department]) {
      summary[user.department] = { userCount: 0, averageAge: 0 };
    }

    summary[user.department].userCount += 1;
    summary[user.department].averageAge += user.age;
  });

  Object.keys(summary).forEach((department) => {
    summary[department].averageAge = summary[department].averageAge / summary[department].userCount;
  });

  return summary;
};
