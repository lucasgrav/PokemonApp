const FormCreator = () => {
  return (
    <div>
      <h1>este es el form</h1>
      <form>
        <label>Name</label>
        <input type="text" />
        <label>Life</label>
        <input type="range" min="0" max="5" />
        <label>Attack</label>
        <input type="text" />
      </form>
    </div>
  );
};

export default FormCreator;
