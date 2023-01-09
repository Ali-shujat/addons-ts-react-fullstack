import './App.css';
import Album from './components/Album';
import { Route, Routes } from "react-router-dom";
import UpdatePuppy from './components/UpdatePuppy';
import AddPuppy from './components/AddPuppy';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Album />} />
        <Route path="/puppy-create" element={<AddPuppy />} />
        <Route path="/puppy-update/:id" element={<UpdatePuppy />} />
      </Routes>

    </>
  );
}

export default App;
