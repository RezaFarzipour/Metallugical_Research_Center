import React from "react";
import { Drawer, DrawerContent, Button, useDisclosure } from "@heroui/react";
import { FiMenu } from "react-icons/fi";

interface DrawerElementProps {
  children: (onClose: () => void) => React.ReactNode;
}

export default function DrawerElement({ children }: DrawerElementProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleBackdropChange = (backdrop: string) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <div className="flex lg:hidden">
        <Button
          isIconOnly
          key={backdrop}
          variant="light"
          onPress={() => handleBackdropChange("transparent")}
        >
          <FiMenu size={20} color="#1a3b77" />
        </Button>
      </div>
      <Drawer
        backdrop={"transparent"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          closeButton: "top-10 left-5",
        }}
        size="xs"
      >
        <DrawerContent>{(onClose) => <>{children(onClose)}</>}</DrawerContent>
      </Drawer>
    </>
  );
}
