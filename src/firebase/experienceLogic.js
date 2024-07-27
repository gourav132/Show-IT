import { db, storage } from './firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const addOrUpdateProject = async (uid, projectOverview, project) => {
  try {
    const { projectTitle, projectDescription, projectFile, githubLink, projectLink } = project;

    // Upload cover photo to Firebase Storage
    const storageRef = ref(storage, `projects/${uid}/${projectFile[0].name}`);
    const snapshot = await uploadBytes(storageRef, projectFile[0]);
    const coverPhotoUrl = await getDownloadURL(snapshot.ref);

    // Prepare project data
    const projectData = {
      projectTitle,
      projectDescription,
      coverPhotoUrl,
      githubLink,
      projectLink
    };

    // Update Firestore
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      projectOverview,
      projects: [projectData]
    }, { merge: true });

    console.log('Project successfully added/updated!');
  } catch (error) {
    console.error('Error adding/updating project: ', error);
  }
};

export default addOrUpdateProject;
