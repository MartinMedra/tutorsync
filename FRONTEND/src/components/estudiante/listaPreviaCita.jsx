import {Listbox, ListboxItem, cn} from "@nextui-org/react";
import {ListboxWrapper} from "./nextUi/ListboxWrapper";
import {AddNoteIcon} from "./nextUi/icons/addNoteIcon";

export default function ListaPreviaCita() {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <ListboxWrapper>
      <Listbox variant="flat" aria-label="Listbox menu with descriptions">
        <ListboxItem
          key="new"
          description="Create a new file"
          startContent={<AddNoteIcon className={iconClasses} />}
        >
          New file
        </ListboxItem>
        <ListboxItem
          key="copy"
          description="Copy the file link"
          startContent={<AddNoteIcon className={iconClasses} />}
        >
          Copy link
        </ListboxItem>
        <ListboxItem
          key="edit"
          showDivider
          description="Allows you to edit the file"
          startContent={<AddNoteIcon className={iconClasses} />}
        >
          Edit file
        </ListboxItem>
        <ListboxItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          startContent={<AddNoteIcon className={iconClasses} />}
        >
          Delete file
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}