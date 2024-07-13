// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, collection, getDocs, query, deleteDoc } from "firebase/firestore";
import { Goal } from "../store/goals/goals.interface";
import { IFilter } from "../store/filters/filtersSlice";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREABSE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export class DatabaseManager {
    async addData(userID: number, goal: Goal) {
        try {
            const goalsRef = await setDoc(doc(db, `users/${userID}/goals`, `${goal.id}`), goal);
            console.log(`Goal written with ID: ${goal.id}`);
            console.log(goalsRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async getData(userID: number) {
        const q = query(collection(db, `users/${userID}/goals`));
        let goals: Goal[] = [];
        const goalsSnap = await getDocs(q);

        goalsSnap.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            goals.push(doc.data() as Goal);
        });

        return goals;
    }

    async deleteData(userID: number, goalId: number) {
        await deleteDoc(doc(db, `users/${userID}/goals/${goalId}`));                    
    }

     async getFilters(): Promise<IFilter[]>  {
        const tg = Telegram.WebApp;
        const db = tg.CloudStorage;
        return new Promise((resolve, reject) => {
            db.getItem("filters", async (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const array = await JSON.parse(data) as IFilter[];
                        resolve(array);
                    } catch (parseErr) {
                        const filters = [
                            { id: 0, title: "All" },
                            { id: 1, title: "Personal" },
                            { id: 2, title: "Sport" },
                            { id: 3, title: "Business" },
                          ];
                          resolve(filters);
                    }
                }
            });
        });
    }
}

