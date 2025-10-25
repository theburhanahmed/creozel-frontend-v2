import React from 'react';
interface ColorSwatchProps {
  color: string;
  name: string;
  variable?: string;
  className?: string;
}
export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  name,
  variable,
  className = ''
}) => {
  return <div className={`space-y-1.5 ${className}`}>
      <div className={`h-12 w-full rounded-md ${color}`} aria-hidden="true"></div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {name}
        </p>
        {variable && <p className="text-xs text-gray-500 dark:text-gray-400">{variable}</p>}
      </div>
    </div>;
};
export const ColorPalette: React.FC = () => {
  return <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Primary Colors
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <ColorSwatch color="bg-green-50 dark:bg-green-900/10" name="Green 50" variable="--color-primary-50" />
          <ColorSwatch color="bg-green-100 dark:bg-green-900/20" name="Green 100" variable="--color-primary-100" />
          <ColorSwatch color="bg-green-200 dark:bg-green-900/30" name="Green 200" variable="--color-primary-200" />
          <ColorSwatch color="bg-green-300 dark:bg-green-900/40" name="Green 300" variable="--color-primary-300" />
          <ColorSwatch color="bg-green-400 dark:bg-green-800" name="Green 400" variable="--color-primary-400" />
          <ColorSwatch color="bg-green-500 dark:bg-green-700" name="Green 500" variable="--color-primary-500" />
          <ColorSwatch color="bg-green-600 dark:bg-green-600" name="Green 600" variable="--color-primary-600" />
          <ColorSwatch color="bg-green-700 dark:bg-green-500" name="Green 700" variable="--color-primary-700" />
          <ColorSwatch color="bg-green-800 dark:bg-green-400" name="Green 800" variable="--color-primary-800" />
          <ColorSwatch color="bg-green-900 dark:bg-green-300" name="Green 900" variable="--color-primary-900" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Gray Scale
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <ColorSwatch color="bg-gray-50 dark:bg-gray-900" name="Gray 50" variable="--color-gray-50" />
          <ColorSwatch color="bg-gray-100 dark:bg-gray-800" name="Gray 100" variable="--color-gray-100" />
          <ColorSwatch color="bg-gray-200 dark:bg-gray-700" name="Gray 200" variable="--color-gray-200" />
          <ColorSwatch color="bg-gray-300 dark:bg-gray-600" name="Gray 300" variable="--color-gray-300" />
          <ColorSwatch color="bg-gray-400 dark:bg-gray-500" name="Gray 400" variable="--color-gray-400" />
          <ColorSwatch color="bg-gray-500 dark:bg-gray-400" name="Gray 500" variable="--color-gray-500" />
          <ColorSwatch color="bg-gray-600 dark:bg-gray-300" name="Gray 600" variable="--color-gray-600" />
          <ColorSwatch color="bg-gray-700 dark:bg-gray-200" name="Gray 700" variable="--color-gray-700" />
          <ColorSwatch color="bg-gray-800 dark:bg-gray-100" name="Gray 800" variable="--color-gray-800" />
          <ColorSwatch color="bg-gray-900 dark:bg-gray-50" name="Gray 900" variable="--color-gray-900" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Semantic Colors
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <ColorSwatch color="bg-red-500 dark:bg-red-600" name="Error" variable="--color-error" />
          <ColorSwatch color="bg-amber-500 dark:bg-amber-600" name="Warning" variable="--color-warning" />
          <ColorSwatch color="bg-blue-500 dark:bg-blue-600" name="Info" variable="--color-info" />
          <ColorSwatch color="bg-green-500 dark:bg-green-600" name="Success" variable="--color-success" />
        </div>
      </div>
    </div>;
};