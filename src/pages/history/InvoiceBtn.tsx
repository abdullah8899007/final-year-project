import React from 'react'

export default function InvoiceBtn({onViewMore}:any) {
    return (
        <div className="w-full w-100% text-center" onClick={onViewMore} >
            <button type="button" className="text-white font-medium rounded-lg text-sm px-5 py-2.5 h-9 w-36 bg-orange-500 rounded-full mx-auto">
                View more
            </button>
        </div>
    )
}
