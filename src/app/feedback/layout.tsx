export default function Layout(props: { children: React.ReactNode }) {
  return <div className="p-4 sm:p-10">{props.children}</div>;
}
