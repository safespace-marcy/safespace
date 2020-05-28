/*

const [users, setUsers] = useState([]); // for mod selection
useEffect(() => {
  const getUsers = async () => {
    const res = await fetch('/all-users');
    const rawUsers = await res.json();
    const cleanUsers = rawUsers.map((user) => ({name: user.username, id: user.id}));
    const filteredUsers = cleanUsers.filter(
      (username) => username !== user?.username
    );
    setUsers(filteredUsers);
  };
  getUsers();
}, [user]);

const modsCopy = [...mods]
for (let i = 0; i < modsCopy.length; i++) {
  let name = modsCopy[i]
  let modData = users.find(mod => mod.name === name)
  modsCopy[i] = modData
}
const modIds = modsCopy.map(mod => mod.id)
 */

/*
<AutoComplete
  label="Moderators"
  helper="Select trusted users to help you manage your community"
  value={mod}
  onChange={(value) => setMod(value)}
  onClean={(cleaned) => setMod(cleaned)}
  onSelect={(selected) => {
    setMods((pre) => [...pre, selected].filter((u) => u));
  }}
  options={users.map(user => user.name).filter((user) => !mods.includes(user))}
/>
{!!mods.length && (
  <>
    <h3>Selected Moderators</h3>
    <p>Moderators can remove posts and users from your community</p>
    <ul>
      {mods.map((mod, i) => (
        <div key={mod}>
        <li >{mod}</li>
        <Button onClick={() => setMods(mods => mods.splice(i, 1))}>Remove</Button>
        </div>
      ))}
    </ul>
  </>
)}
 */
