import GoalsPage from "./pages/GoalsPage";
import Footer from "./components/layout/Footer/Footer";
import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import OngoingPage from "./pages/OngoingPage";
import SettingsPage from "./pages/SettingsPage";
import autoAnimate from "@formkit/auto-animate";
import GoalItem from "./pages/GoalItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import CreateGoal from "./pages/CreateGoal";
import CategoriesPage from "./pages/CategoriesPage";
import CreateNotes from "./pages/CreateNotes";
import GoalEditor from "./pages/GoalEditor";
import ArchivePage from "./pages/ArchivePage";
import { DatabaseManager } from "./api/script";
import { getGoals } from "./store/goals/goalsSlice";
import { Spinner } from "./components/ui/Loader/Loader";
import { getFilters } from "./store/filters/filtersSlice";

function App() {
  const parent = useRef(null);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const showFooter = ["/", "/ongoing", "/settings"].includes(pathname) && !isOpen;
  const tg = Telegram.WebApp;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      const userId = tg.initDataUnsafe.user?.id;
      if (userId !== undefined) {
        const db = new DatabaseManager();
        try {
          const goals = await db.getData(userId);
          const filters = await db.getFilters();
          dispatch(getFilters(filters));
          dispatch(getGoals(goals));
        } catch (error) {
          console.error("Error fetching goals: ", error);
        }
      } else {
        console.log("User is not authorized");
      }
      setIsLoading(false);
    };

    fetchGoals();
  }, []);

  useEffect(() => {
    tg.expand();
  }, []);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className='max-w-[400px] relative mx-auto'>
      <div ref={parent}>
        {isLoading ? (
          <div className='absolute top-1/2 left-1/2'>
            <Spinner size={"large"} />
          </div>
        ) : (
          <Routes>
            <Route
              path='*'
              element={<NotFoundPage />}
            />
            <Route
              path='/'
              element={<GoalsPage />}
            />
            <Route
              path='/ongoing'
              element={<OngoingPage />}
            />
            <Route
              path='/settings'
              element={<SettingsPage />}
            />
            <Route
              path='/create'
              element={<CreateGoal />}
            />
            <Route
              path='/goal/:goalId'
              element={<GoalItem />}
            />
            <Route
              path='/categories'
              element={<CategoriesPage />}
            />
            <Route
              path='/goal/:goalId/edit'
              element={<GoalEditor />}
            />
            <Route
              path='/goal/:goalId/createnote'
              element={<CreateNotes />}
            />
            <Route
              path='/archive'
              element={<ArchivePage />}
            />
          </Routes>
        )}
      </div>
      {showFooter ? <Footer /> : ""}
    </div>
  );
}

export default App;
