import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { GlassCard } from './GlassCard';
import { Heading1, Heading2, Heading3, Heading4, BodyLarge, BodyText, Caption, Metadata, Label } from './Typography';
import { ArrowRightIcon, CheckIcon, XIcon, AlertTriangleIcon, InfoIcon, StarIcon } from 'lucide-react';
export const DesignSystem: React.FC = () => {
  return <div className="max-w-6xl mx-auto p-6 space-y-12">
      <section>
        <Heading1 className="mb-4">Design System</Heading1>
        <BodyLarge className="mb-8">
          A comprehensive guide to our UI components and visual language.
        </BodyLarge>
        <Heading2 className="mb-6">Color System</Heading2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Primary Colors</CardTitle>
              <CardDescription>Our main brand colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch color="bg-green-500" name="Primary" variable="--primary" />
                <ColorSwatch color="bg-green-600" name="Primary Hover" variable="--primary-hover" />
                <ColorSwatch color="bg-green-700" name="Primary Active" variable="--primary-active" />
                <ColorSwatch color="bg-white" name="Primary Foreground" variable="--primary-foreground" textColor="text-black" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Semantic Colors</CardTitle>
              <CardDescription>Colors with specific meanings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch color="bg-red-500" name="Destructive" variable="--destructive" />
                <ColorSwatch color="bg-amber-500" name="Warning" variable="--warning" />
                <ColorSwatch color="bg-blue-500" name="Info" variable="--info" />
                <ColorSwatch color="bg-green-500" name="Success" variable="--success" />
              </div>
            </CardContent>
          </Card>
        </div>
        <Heading2 className="mb-6">Typography</Heading2>
        <Card className="mb-12">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <Heading1>Heading 1</Heading1>
                <Caption className="mt-2">text-3xl font-bold</Caption>
              </div>
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <Heading2>Heading 2</Heading2>
                <Caption className="mt-2">text-2xl font-bold</Caption>
              </div>
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <Heading3>Heading 3</Heading3>
                <Caption className="mt-2">text-xl font-semibold</Caption>
              </div>
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <Heading4>Heading 4</Heading4>
                <Caption className="mt-2">text-lg font-medium</Caption>
              </div>
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <BodyLarge>Body Large</BodyLarge>
                <Caption className="mt-2">text-base</Caption>
              </div>
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <BodyText>Body Text</BodyText>
                <Caption className="mt-2">text-sm</Caption>
              </div>
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <Caption>Caption Text</Caption>
                <Caption className="mt-2">text-sm text-gray-600</Caption>
              </div>
              <div>
                <Metadata>Metadata Text</Metadata>
                <Caption className="mt-2">text-xs text-gray-500</Caption>
              </div>
            </div>
          </CardContent>
        </Card>
        <Heading2 className="mb-6">Components</Heading2>
        <Heading3 className="mb-4">Buttons</Heading3>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <Caption>Button Variants</Caption>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <StarIcon size={16} />
                  </Button>
                </div>
                <Caption>Button Sizes</Caption>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button leftIcon={<CheckIcon size={16} />}>
                    With Left Icon
                  </Button>
                  <Button rightIcon={<ArrowRightIcon size={16} />}>
                    With Right Icon
                  </Button>
                  <Button isLoading>Loading</Button>
                  <Button isLoading loadingText="Processing...">
                    Submit
                  </Button>
                </div>
                <Caption>Button States</Caption>
              </div>
            </div>
          </CardContent>
        </Card>
        <Heading3 className="mb-4">Badges</Heading3>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
                <Caption>Badge Variants</Caption>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge size="sm">Small</Badge>
                  <Badge size="default">Default</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
                <Caption>Badge Sizes</Caption>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge icon={<CheckIcon size={12} />}>With Icon</Badge>
                  <Badge icon={<XIcon size={12} />} variant="destructive">
                    Error
                  </Badge>
                  <Badge icon={<AlertTriangleIcon size={12} />} variant="warning">
                    Warning
                  </Badge>
                  <Badge icon={<InfoIcon size={12} />} variant="info">
                    Info
                  </Badge>
                </div>
                <Caption>Badges with Icons</Caption>
              </div>
            </div>
          </CardContent>
        </Card>
        <Heading3 className="mb-4">Cards</Heading3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>
                Basic card with header and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BodyText>This is the content area of the card.</BodyText>
            </CardContent>
          </Card>
          <Card variant="outline">
            <CardHeader>
              <CardTitle>Outline Card</CardTitle>
              <CardDescription>Card with outline variant</CardDescription>
            </CardHeader>
            <CardContent>
              <BodyText>This is the content area of the card.</BodyText>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Card with elevated shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <BodyText>This is the content area of the card.</BodyText>
            </CardContent>
          </Card>
        </div>
        <Heading3 className="mb-4">Glass Cards</Heading3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GlassCard className="p-6">
            <Heading4 className="mb-2">Default Glass Card</Heading4>
            <BodyText>Glass card with default styling</BodyText>
          </GlassCard>
          <GlassCard variant="primary" className="p-6">
            <Heading4 className="mb-2">Primary Glass Card</Heading4>
            <BodyText>Glass card with primary color tint</BodyText>
          </GlassCard>
          <GlassCard variant="accent" intensity="heavy" blur="lg" className="p-6">
            <Heading4 className="mb-2">Accent Glass Card (Heavy)</Heading4>
            <BodyText>
              Glass card with accent color and heavy intensity
            </BodyText>
          </GlassCard>
          <GlassCard variant="secondary" intensity="light" blur="sm" className="p-6">
            <Heading4 className="mb-2">Secondary Glass Card (Light)</Heading4>
            <BodyText>
              Glass card with secondary color and light intensity
            </BodyText>
          </GlassCard>
        </div>
      </section>
    </div>;
};
interface ColorSwatchProps {
  color: string;
  name: string;
  variable?: string;
  textColor?: string;
}
const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  name,
  variable,
  textColor = 'text-white'
}) => {
  return <div className="space-y-2">
      <div className={`h-12 w-full rounded-md ${color}`}></div>
      <div>
        <p className="text-sm font-medium">{name}</p>
        {variable && <p className="text-xs text-gray-500 dark:text-gray-400">{variable}</p>}
      </div>
    </div>;
};
export default DesignSystem;