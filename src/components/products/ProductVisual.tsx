import type { ProductCategory } from "@/data/products";
import Image from "next/image";

// Fallback gradients for products without images
const categoryTreatment: Record<ProductCategory, string> = {
  sticks: "linear-gradient(155deg, #e9b989 0%, #d9922f 45%, #8a531f 100%)",
  oils: "linear-gradient(155deg, #f3d9b6 0%, #d97724 55%, #5a3820 100%)",
  powder: "linear-gradient(155deg, #eccba0 0%, #c76a29 50%, #6b3f1c 100%)",
  quillings: "linear-gradient(155deg, #e5c39a 0%, #b3671f 55%, #4a2c15 100%)",
  chips: "linear-gradient(155deg, #e2b98a 0%, #a85c22 55%, #43290f 100%)",
  leaves: "linear-gradient(155deg, #cbb37a 0%, #7c8a3d 55%, #37421c 100%)",
};

export function ProductVisual({
  category,
  image,
  alt,
  className,
}: {
  category: ProductCategory;
  image?: string;
  alt?: string;
  className?: string;
}) {
  if (image) {
    return (
      <div className={className}>
        <Image
          src={image}
          alt={alt || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ background: categoryTreatment[category] }}
      aria-hidden="true"
    >
      <div
        className="h-full w-full opacity-30 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(100deg, transparent 0 22px, rgba(43,26,16,0.25) 22px 24px)",
        }}
      />
    </div>
  );
}
