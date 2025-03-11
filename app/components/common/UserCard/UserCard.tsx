import profile from '~/assets/profile.svg'

interface UserCardProps{
  image?: string
  name?: string
  email?: string
}

export function UserCard({image, name, email}:UserCardProps) {
  
  return (
    <>
      {/* Cards: User */}
      <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-xs dark:bg-gray-800 dark:text-gray-100">
        {/* Card Cover/Avatar */}
        <div
          className="mb-8 bg-cover"
          style={{
            backgroundImage:
              'url("https://cdn.tailkit.com/media/placeholders/photo-JgOeRuGD_Y4-800x400.jpg")',
          }}
        >
          <div className="flex h-32 items-end justify-center">
            <div className="-mb-12 rounded-full bg-gray-200/50 p-2 dark:bg-gray-600/50">
              <img
                src={image ? image : profile}
                alt={image ? `foto de perfil do professor ${name}` : 'foto de perfil anônima'}
                className="inline-block size-20 rounded-full"
              />
            </div>
          </div>
        </div>
        {/* END Card Cover/Avatar */}
        
        {/* Card Body */}
        <div className="grow p-5 text-center">
          <h3 className="mt-3 mb-1 text-lg font-semibold">{name}</h3>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {email}
          </p>
        </div>
        {/* END Card Body */}
      </div>
      {/* END Cards: User */}
    </>
  );
}

