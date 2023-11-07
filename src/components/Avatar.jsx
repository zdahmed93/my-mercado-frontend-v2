import React from 'react'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

function Avatar({user}) {
  const tooltipContent = (
    <>
      <p className='m-0'>{user.firstName} {user.lastName}</p>
      <p className='m-0'>{user.email}</p>
    </>
  )
  const firstNameFirstLetter = user.firstName[0].toUpperCase()
  const lastNameFirstLetter = user.lastName[0].toUpperCase()

  return (
    <Tooltip overlay={tooltipContent} motion={{motionName: 'rc-tooltip-zoom'}}>
      <div className='avatar bg-secondary text-white shadow-sm rounded-circle position-absolute bottom-0 end-0 mb-2 me-2'>
        {firstNameFirstLetter}{lastNameFirstLetter}
      </div>
    </Tooltip>
  )
}

export default Avatar