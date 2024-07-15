import Button from '@components/base/Button';
import { COLOR_NAME } from '@constants/colorName';
import { SIZE } from '@constants/size';
import { TbMessage2Plus } from 'react-icons/tb';

function AddExpenseButton({
  openFormModal,
  isOpenFormModal,
}: {
  openFormModal: () => void;
  isOpenFormModal: boolean;
}) {
  return (
    <div className="fixed bottom-10 right-6 z-20">
      <Button
        color={COLOR_NAME.SECONDARY}
        className="rounded-box shadow-lg"
        size={SIZE.LARGE}
        icon={TbMessage2Plus}
        onClick={openFormModal}
        disabled={isOpenFormModal}
      />
    </div>
  );
}

export default AddExpenseButton;
