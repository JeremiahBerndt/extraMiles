import { useState, useEffect, useCallback } from 'react'
import VehicleSelect from '../vehicleSelect/vehicleSelect'
import './vehicleSelectBox.css'
import axios from 'axios'

interface IVehicle {
  Year?: number
  Make?: string
  Model?: string
  Engine?: string
}

export default function VehicleSelectBox() {
  debugger
  const years = Array.from({ length: 2023 - 1995 }, (none, i) => 1995 + i)
  const engines = ['Small', 'Medium', 'Large']
  const [makes, setMakes] = useState()
  const [models, setModels] = useState()
  const [vehicleState, setVehicleState] = useState<IVehicle>({})

  console.log('option', vehicleState)

  useEffect(() => {
    if (vehicleState?.Year && !makes) {
      axios('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json')
        .then(({ data }) => {
          //there are 10,000+ makes and it doesn't look like it takes "year" as query param, so I shortened it for simplicity
          const shortenMakes = data.Results.slice(0, 200)
          setMakes(shortenMakes.map((m: { Make_Name: string }) => m.Make_Name))
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [vehicleState, makes])

  useEffect(() => {
    if (vehicleState?.Make && !models) {
      axios(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${vehicleState.Make}?format=json`)
        .then(({ data }) => {
          setModels(data.Results.map((m: { Model_Name: string }) => m.Model_Name))
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [vehicleState, models])

  const updateVehicleData = useCallback(
    (selector: string, option: string) => {
      setVehicleState((prevState) => (
        { ...prevState, [selector]: option }
      ))
    },
    []
  )

  return (
    <div className='vehicleSelectBox'>
      <VehicleSelect
        disabled={false}
        options={['Select', ...years]}
        updateVehicleData={updateVehicleData}
        selected={vehicleState.Year}
        name={'Year'}
      />
      <VehicleSelect
        disabled={!vehicleState?.Year}
        options={makes}
        updateVehicleData={updateVehicleData}
        selected={vehicleState.Make}
        name={'Make'}
      />
      <VehicleSelect
        disabled={!vehicleState?.Make}
        options={models}
        updateVehicleData={updateVehicleData}
        selected={vehicleState.Model}
        name={'Model'}
      />
      <VehicleSelect
        disabled={!vehicleState?.Model}
        options={engines}
        updateVehicleData={updateVehicleData}
        selected={vehicleState.Engine}
        name={'Engine'}
      />
    </div>
  )
}
