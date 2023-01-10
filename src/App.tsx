import './App.css';
import Album from './components/Album';
import { Route, Routes } from "react-router-dom";
import UpdatePuppy from './components/UpdatePuppy/UpdatePuppy';
import AddPuppy from './components/AddPuppy';
import DetailPuppy from './components/shared/DetailPuppy/DetailPuppy';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Album />} />
        <Route path="/puppy-create" element={<AddPuppy />} />
        <Route path="/puppy-update/:id" element={<UpdatePuppy />} />
        <Route path="/puppy-details/:id" element={<DetailPuppy />} />
      </Routes>

    </>
  );
}

export default App;
