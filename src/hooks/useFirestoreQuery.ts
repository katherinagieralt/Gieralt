import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  collection, 
  query, 
  getDocs, 
  QueryConstraint, 
  DocumentData, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { db } from "../firebase";

export function useFirestoreQuery<T = DocumentData>(
  queryKey: string[],
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const q = query(collection(db, collectionName), ...constraints);
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    }
  });
}

export function useFirestoreMutation(collectionName: string) {
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: async (data: any) => {
      return addDoc(collection(db, collectionName), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    }
  });

  const update = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return updateDoc(doc(db, collectionName, id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    }
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      return deleteDoc(doc(db, collectionName, id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    }
  });

  return { add, update, remove };
}
