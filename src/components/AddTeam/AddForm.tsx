"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios';
import{FormDataSchema} from '../../types/schema'
type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Step 1',
    name: 'ADD TEAM',
    fields: ['nom','logo']
  },
  {
    id: 'Step 2',
    name: 'ADD PLAYERS',
    fields: ['nom', 'prenom', 'email']
  },
  { id: 'Step 3', name: 'Complete' }
]

type Player = {
  firstName: string;
  lastName: string;
  email: string;
  position: string;

};


export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [players, setPlayers] = useState<Player[]>([]); 
  const [formData, setFormData] = useState({
    name:'',
    logo:null,
    players: [{
      firstName: '',
      lastName: '',
      email: '',
      position: '',
    }]
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });
  const addPlayer = () => {
    setPlayers([...players, { firstName: '', lastName: '', email: '',position:'' }]);
  };
  const removePlayer = (index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers)
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };  
  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {

      data.logo=selectedFile?.name
      console.log(data.logo);

      const response = await axios.post("http://localhost:3001/team/teamP", data );
      console.log('Team and players created successfully:', response.data);
      reset();
    } catch (error) {
      console.error(data);
      
      console.error('Error creating team and players:', error);
    }
  };
  
  
  type FieldName = keyof Inputs;

  
  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });
   
  if (!output)return console.log(errors)
    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep(step => step + 1);
    }
  };
  

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep(step => step - 1);
    }
  };

  return (
    <section className='absolute inset-0 flex flex-col justify-between p-24'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
          initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Personal Information
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Provide your personal details.
          </p>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Name
              </label>
              <input
                type='text'
                id='firstName'
                {...register('name')}
                autoComplete='given-name'
                className='block w-full rounded-md pl-2 text-black border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
              />
            </div>
            <div className='sm:col-span-3'>
              <label
                htmlFor='country'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Country
              </label>
              <input
                type='text'
                id='country'
                {...register('country')}
                autoComplete='country'
                className='block w-full rounded-md  pl-2 text-black border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
              />
            </div>
            <div className='sm:col-span-3'>
              <label
                htmlFor='city'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                City
              </label>
              <input
                type='text'
                id='city'
                {...register('city')}
                autoComplete='city'
                className='block w-full rounded-md border-0 py-1.5 pl-2 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
  />
            </div>
            <div className='sm:col-span-3'>
              <label
                htmlFor='logo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Logo
              </label>
              <div className='mt-2'>
                <input
                  type='file'
                  id='logo'
                  onChange={handleFileChange}
                  autoComplete='given-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Joueurs 
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Ajoutez des joueurs a l'equipe
            </p>

            {players.map((player, index) => (
  <div key={index} className="mt-4 border p-4 rounded-md">
    <h2 className="text-lg font-semibold">Joueur {index + 1}</h2>
    <div className="mt-2">
      <label htmlFor={`firstName${index}`} className="block text-sm font-medium leading-5 text-gray-700">Nom</label>
      <input
        type="text"
        {...register(`players.${index}.firstName`)}
        id={`firstName${index}`}
        className="mt-1 block w-full rounded-md pl-2 text-black  border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
        placeholder="Nom"
      />
    </div>
    <div className="mt-2">
      <label htmlFor={`lastName${index}`} className="block text-sm font-medium leading-5 text-gray-700">Prénom</label>
      <input
        type="text"
        {...register(`players.${index}.lastName`)}
        id={`lastName${index}`}
        className="mt-1 block w-full pl-2 text-black rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
        placeholder="Prénom"
      />
    </div>
    <div className="mt-2">
      <label htmlFor={`email${index}`} className="block text-sm font-medium leading-5 text-gray-700">Email</label>
      <input
        type="email"
        {...register(`players.${index}.email`)}
        id={`email${index}`}
        className="mt-1 block w-full pl-2 text-black rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
        placeholder="Email"
      />
    </div>
    <div className="mt-2">
  <label htmlFor={`position${index}`} className="block  text-sm font-medium leading-5 text-gray-700">Poste</label>
  <select
    id={`position${index}`}
    {...register(`players.${index}.position`)}
    className="mt-1 block w-full pl-2 text-black rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
  >
    <option value="gardien">Gardien</option>
    <option value="defenseur">Défenseur</option>
    <option value="milieu">Milieu</option>
    <option value="attaquant">Attaquant</option>
  </select>
</div>
    <button
      type="button"
      onClick={() => removePlayer(index)}
      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
    >
      Supprimer ce joueur
    </button>
  </div>
))}
<button
  type="button"
  onClick={addPlayer}
  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:border-sky-700 focus:shadow-outline-sky active:bg-sky-700 transition ease-in-out duration-150"
>
  Ajouter un joueur
</button>

          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Complete
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Votre equipe a ete ajouté avec succès
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}