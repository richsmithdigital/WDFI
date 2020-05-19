function useCheckin(fStore) {
  const ref = fStore().collection("checkins");
  const createCheckin = checkin => ref.add(checkin);
  const readCheckins = () => ref.get();
  const readCheckinComments = id =>
    ref
      .doc(id)
      .collection("comments")
      .orderBy("time", "asc")
      .get();
  const writeCheckinComments = (id, comment) =>
    ref
      .doc(id)
      .collection("comments")
      .add(comment);

  return {
    createCheckin,
    readCheckins,
    readCheckinComments,
    writeCheckinComments
  };
}
export default useCheckin;
