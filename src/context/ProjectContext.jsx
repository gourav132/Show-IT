import React, { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const ProjectContext = createContext();

export const ProjectProvider = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [PRloading, setPRLoading] = useState(true);
  const [projects, setProjects] = useState({
    overview: "",
    uid: null,
    projects: [],
  });

  useEffect(() => {
    setPRLoading(true);
    let unsubscribe;
    if (!loading && user) {
      // Set the user's UID
      setProjects((prevState) => ({ ...prevState, uid: user.uid }));

      // Create a query to fetch only the projects of the current user
      const q = query(
        collection(db, "projects"),
        where("userID", "==", user.uid)
      );

      // Set up a real-time listener
      unsubscribe = onSnapshot(q, (snapshot) => {
        const userProjects = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Include the document ID
        }));

        // Update the context with the fetched projects
        setProjects((prevState) => ({
          ...prevState,
          projects: userProjects,
        }));
      });
      setPRLoading(!PRloading);
    }

    // Clean up the listener on unmount or when user changes
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [loading, user]);

  return (
    <ProjectContext.Provider value={[projects, setProjects, PRloading]}>
      {props.children}
    </ProjectContext.Provider>
  );
};
