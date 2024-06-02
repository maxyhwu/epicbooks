import GoShoppingButton from "./_components/GoShoppingButton";
type Pageprops = {
  searchParams: {
    username: string,
  }
};
async function SuccessPage({searchParams:{username}}: Pageprops) {
  return (
    <div className="flex h-full w-full flex-wrap justify-center gap-4 rounded-b-xl px-10">
      <div className="flex h-40 w-full items-end justify-center py-4 text-3xl font-semibold">
        <span>販售成功 !</span>
      </div>
      <div className="flex h-40 w-full items-start justify-center">
        <GoShoppingButton username={username}/>
      </div>
    </div>
  );
}

export default SuccessPage;
