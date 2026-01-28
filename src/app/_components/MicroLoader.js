
export default function MicroLoader({
  size = 16,
  color = "#555",
  loading = true,
}) {
  if (!loading) return null;

  return (
    <span
      style={{
        width: 16,                
      }}

    />
  );
}
