export interface BlogCardItem {
    id: string;
    title: string;
    content: string;
    photoUrl: string;     // ✅ đổi từ imageUrl thành photoUrl
    authorId: string;     // ✅ đổi từ staff_id thành authorId
    date: string;
    status: string;
  }
  