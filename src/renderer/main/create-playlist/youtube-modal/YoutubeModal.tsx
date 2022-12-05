interface YoutubeModalProps {
  handleHideModal: () => void;
}

export default function YoutubeModal({ handleHideModal }: YoutubeModalProps) {
  return (<>
      <div
        className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
      >
        <div>
          <div
            className='relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none'>
            <div className='flex items-start justify-between p-5 rounded-t'>
              <h3 className='text-2xl font-bold text-white'>
                Importer depuis YouTube
              </h3>
              <button
                className='p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={handleHideModal}
              >
                <span
                  className='bi bi-x bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none'>
                </span>
              </button>
            </div>
            <div className='relative px-6 flex-auto'>
              <div>
                <label className='text-gray-200 font-bold text-xl'>Lien youtube</label>
                <input
                  className='bg-gray-900 text-white p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white w-full'
                  type='text'
                  placeholder='Lien'
                />
              </div>
            </div>
            <div className='flex items-center justify-end p-6 rounded-b'>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={handleHideModal}
              >
                Annuler
              </button>
              <button
                className='bg-blue-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={handleHideModal}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
}
