import classNames from 'classnames';

// Store
import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// Components
import { ButtonIcon } from 'shared/ui/button';

// Icons
import { FaEquals } from "react-icons/fa";
import { FaGripHorizontal } from "react-icons/fa";

// четыре
import { PiNumberThreeFill } from "react-icons/pi";
import { PiNumberFourFill } from "react-icons/pi";
import { PiNumberFiveFill } from "react-icons/pi";

export const ChangeViewTask = observer(() => {

    const TaskStore = useStore();
    const currentTaskTemplate = TaskStore.tasks_view.tasks_template;
    const currentTaskQuantity = TaskStore.tasks_view.tasks_cards_quan;

    function changeView(e: React.MouseEvent<HTMLButtonElement>) {
        if(e.currentTarget.id == 'line' || e.currentTarget.id == 'card') {
            TaskStore.setTasksTemplate(e.currentTarget.id)
        }
    }

    function changeQuantityCards(e: React.MouseEvent<HTMLButtonElement>) {
        if(e.currentTarget.id == '3-cards' || e.currentTarget.id == '4-cards' || e.currentTarget.id == '5-cards') {
            TaskStore.setQuantityCards(e.currentTarget.id)
        }
    }

    return (
        <div className='flex flex-col gap-2 items-end'>

            <div className="flex gap-2">
                <div className={classNames(
                    '', {
                        'p-2 relative top-2 pb-4': currentTaskTemplate == 'card',
                    }
                )}>
                    <ButtonIcon addClass={currentTaskTemplate == 'line' ? 'bg-indigo-800 text-white' : 'bg-white'} id="line" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>changeView(e)} iconName={<FaEquals/>}/>
                </div>
                <div className={classNames(
                    '', {
                        'bg-indigo-50 p-2 rounded-tl-lg rounded-tr-lg pb-4 relative top-2': currentTaskTemplate == 'card',
                    }
                )}>
                    <ButtonIcon addClass={currentTaskTemplate == 'card' ? 'bg-indigo-800 text-white' : 'bg-white'} id="card" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>changeView(e)} iconName={<FaGripHorizontal/>}/>
                </div>
            </div>
            
            {currentTaskTemplate == 'card' &&
                <div className={classNames(
                    'flex gap-2', {
                        'bg-indigo-50 p-2 rounded-tl-lg rounded-br-lg rounded-bl-lg': currentTaskTemplate == 'card',
                    }
                )}>
                    <ButtonIcon addClass={currentTaskQuantity == '3-cards' ? 'bg-indigo-800 text-white' : 'bg-white'} id="3-cards" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>changeQuantityCards(e)} iconName={<PiNumberThreeFill/>}/>
                    <ButtonIcon addClass={currentTaskQuantity == '4-cards' ? 'bg-indigo-800 text-white' : 'bg-white'} id="4-cards" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>changeQuantityCards(e)} iconName={<PiNumberFourFill/>}/>
                    <ButtonIcon addClass={currentTaskQuantity == '5-cards' ? 'bg-indigo-800 text-white' : 'bg-white'} id="5-cards" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>changeQuantityCards(e)} iconName={<PiNumberFiveFill/>}/>
                </div>
            }

        </div>
    );
})

                