import React, { memo } from 'react'
import './vehicleSelect.css'
import { IVehicle } from '../vehicleSelectBox/vehicleSelectBox'

export interface VehicleSelectProps {
  options?: Array<string | number>
  name: string
  disabled: boolean
  selected?: string | number
  setVehicleState: React.Dispatch<React.SetStateAction<IVehicle>>
}

function VehicleSelect({ options, name, disabled, selected, setVehicleState }: VehicleSelectProps) {
  const selectorState = (!options?.length && !disabled) ? 'Loading...' : 'Select'

  const updateVehicleData = (selector: string, option: string) => {
    setVehicleState((prevState: IVehicle) => (
      { ...prevState, [selector]: option }
    ))
  }

  return (
    <div style={{ margin: '1em' }}>
      <label htmlFor='.selector' aria-label={name}>{name}
        <select
          className='selector'
          value={selected || 'Select'}
          disabled={disabled}
          onChange={(e) => updateVehicleData(name, e.target.value)}
        >
          <option value='Select' disabled>{selectorState}</option>
          {options
            ? options.map((option: string | number, idx: number) => (
              <option value={option} key={`${name + idx}`}>
                {option}
              </option>
            ))
            : <option value='Loading...'>Loading...</option>
          }
        </select>
      </label>
    </div>
  )
}

export default memo(VehicleSelect)