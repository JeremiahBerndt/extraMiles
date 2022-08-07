import { memo } from 'react'
import './vehicleSelect.css'

export interface VehicleSelectProps {
  options?: Array<string | number>
  name: string
  disabled: boolean
  selected?: string | number
  updateVehicleData: (selector: string, option: string) => void
}

function VehicleSelect({ options, name, disabled, selected, updateVehicleData }: VehicleSelectProps) {

  return (
    <div style={{ margin: '1em' }}>
      <label htmlFor='.selector'>{name}</label>
      <select
        className='selector'
        value={selected}
        disabled={disabled}
        onChange={(e) => updateVehicleData(name, e.target.value)}
      >{
          !disabled
            ? options
              ? options.map((option: string | number, idx: number) => (
                <option value={option} key={idx}>
                  {option}
                </option>
              ))
              : <option value='Loading...'>Loading...</option>
            : <option value='Select'>Select</option>
        }
      </select>
    </div>
  )
}

export default memo(VehicleSelect)