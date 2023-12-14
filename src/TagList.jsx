export default function TagList(props) {
  const createTagArray = () => {
    const tagArray = [];
    return tagArray;
  };

  return (
    <>
      <input list="tags" name="tags" />
      <datalist id="tags">
        <option value="Nuq" />
        <option value="Nuqquu" />
        <option value="Busy" />
        <option value="Koodaa" />
        <option value="Ok" />
      </datalist>
    </>
  );
}
